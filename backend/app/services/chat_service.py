from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, desc, func
from typing import List, Optional
from fastapi import HTTPException

from app.models.user import User
from app.models.message import Message
from app.schemas.message_schema import MessageCreate, ChatUser
from app.utils.websocket import manager

async def get_allowed_roles(user_role: str) -> List[str]:
    """Preserves your original role-based access logic."""
    role = user_role.upper()
    if role == "CANDIDATE":
        return ["HR"]
    elif role == "HR":
        return ["CANDIDATE", "ADMIN", "HR"]
    elif role == "ADMIN":
        return ["HR"]
    return []

async def fetch_chat_contacts(
    db: AsyncSession, 
    current_user: User, 
    search: Optional[str] = None
) -> List[ChatUser]:
    """Logic for retrieving contacts, last messages, and unread counts."""
    allowed_roles = await get_allowed_roles(current_user.role)
    if not allowed_roles:
        return []

    query = select(User).where(User.role.in_(allowed_roles), User.id != current_user.id)
    if search:
        query = query.where(User.fullname.ilike(f"%{search}%"))

    result = await db.execute(query)
    users = result.scalars().all()

    chat_users = []
    for u in users:
        # Get last message logic
        last_msg_query = select(Message).where(
            or_(
                and_(Message.sender_id == current_user.id, Message.receiver_id == u.id),
                and_(Message.sender_id == u.id, Message.receiver_id == current_user.id)
            )
        ).order_by(desc(Message.timestamp)).limit(1)
        
        last_msg_result = await db.execute(last_msg_query)
        last_msg = last_msg_result.scalar_one_or_none()

        # Unread count logic (optimized to count in DB)
        unread_query = select(func.count(Message.id)).where(
            Message.sender_id == u.id,
            Message.receiver_id == current_user.id,
            Message.is_read == False
        )
        unread_result = await db.execute(unread_query)
        unread_count = unread_result.scalar() or 0

        chat_users.append(ChatUser(
            id=u.id,
            fullname=u.fullname,
            role=u.role,
            profile_image_url=u.profile_image_url,
            is_online=manager.is_user_online(u.id),
            last_message=last_msg.content if last_msg else None,
            last_message_time=last_msg.timestamp if last_msg else None,
            unread_count=unread_count
        ))

    # Sort by recent message time (reverse=True)
    chat_users.sort(
        key=lambda x: x.last_message_time.timestamp() if x.last_message_time else 0, 
        reverse=True
    )
    return chat_users

async def get_messages_history(
    db: AsyncSession, 
    current_user_id: int, 
    other_user_id: int
) -> List[Message]:
    """Marks messages as read and returns conversation history."""
    # Mark messages as read logic
    unread_query = select(Message).where(
        Message.sender_id == other_user_id,
        Message.receiver_id == current_user_id,
        Message.is_read == False
    )
    result = await db.execute(unread_query)
    unreads = result.scalars().all()
    for msg in unreads:
        msg.is_read = True
    
    if unreads:
        await db.commit()

    # Get history logic
    query = select(Message).where(
        or_(
            and_(Message.sender_id == current_user_id, Message.receiver_id == other_user_id),
            and_(Message.sender_id == other_user_id, Message.receiver_id == current_user_id)
        )
    ).order_by(Message.timestamp)
    
    result = await db.execute(query)
    return result.scalars().all()

async def store_new_message(
    db: AsyncSession, 
    current_user: User, 
    other_user_id: int, 
    msg_in: MessageCreate
) -> Message:
    """Verifies permissions and saves the message."""
    allowed_roles = await get_allowed_roles(current_user.role)
    
    user_query = select(User).where(User.id == other_user_id)
    result = await db.execute(user_query)
    receiver = result.scalar_one_or_none()
    
    if not receiver or receiver.role not in allowed_roles:
        raise HTTPException(status_code=403, detail="You cannot message this user.")

    new_msg = Message(
        sender_id=current_user.id,
        receiver_id=other_user_id,
        content=msg_in.content
    )
    db.add(new_msg)
    await db.commit()
    await db.refresh(new_msg)
    return new_msg