from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, desc
from typing import List, Optional
from jose import jwt, JWTError
from app.utils.auth import SECRET_KEY, ALGORITHM
from app.models.user import User
from app.models.message import Message
from app.schemas.message_schema import ChatUser
from app.utils.websocket import manager

async def get_allowed_roles(user_role: str) -> List[str]:
    """
    Returns the list of roles that the given user role is allowed to message.
    """
    role = user_role.upper()
    if role == "CANDIDATE":
        return ["HR"]
    elif role == "HR":
        return ["CANDIDATE", "ADMIN", "HR"]
    elif role == "ADMIN":
        return ["HR"]
    return []

async def verify_token(token: str, db: AsyncSession):
    """
    Verifies the JWT token and returns the corresponding User object.
    """
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    except JWTError:
        return None

async def get_contacts(db: AsyncSession, current_user: User, search: Optional[str] = None) -> List[ChatUser]:
    """
    Fetches the list of contacts for the current user, including last message and unread count.
    """
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
        # Get last message
        last_msg_query = select(Message).where(
            or_(
                and_(Message.sender_id == current_user.id, Message.receiver_id == u.id),
                and_(Message.sender_id == u.id, Message.receiver_id == current_user.id)
            )
        ).order_by(desc(Message.timestamp)).limit(1)
        
        last_msg_result = await db.execute(last_msg_query)
        last_msg = last_msg_result.scalar_one_or_none()

        # Unread count
        unread_query = select(Message).where(
            Message.sender_id == u.id,
            Message.receiver_id == current_user.id,
            Message.is_read == False
        )
        unread_result = await db.execute(unread_query)
        unread_count = len(unread_result.scalars().all())

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

    # Sort by recent message time
    chat_users.sort(key=lambda x: x.last_message_time.timestamp() if x.last_message_time else 0, reverse=True)
    return chat_users

async def get_messages(db: AsyncSession, current_user: User, other_user_id: int) -> List[Message]:
    """
    Retrieves message history between the current user and another user, 
    and marks all incoming messages as read.
    """
    # Mark messages as read
    unread_query = select(Message).where(
        Message.sender_id == other_user_id,
        Message.receiver_id == current_user.id,
        Message.is_read == False
    )
    result = await db.execute(unread_query)
    unreads = result.scalars().all()
    for msg in unreads:
        msg.is_read = True
    if unreads:
        await db.commit()

    # Get history
    query = select(Message).where(
        or_(
            and_(Message.sender_id == current_user.id, Message.receiver_id == other_user_id),
            and_(Message.sender_id == other_user_id, Message.receiver_id == current_user.id)
        )
    ).order_by(Message.timestamp)
    
    result = await db.execute(query)
    return result.scalars().all()

async def send_message(db: AsyncSession, current_user: User, other_user_id: int, content: str, client_id: Optional[str] = None) -> Message:
    """
    Sends a message to another user if the roles are compatible, 
    and broadcasts it via WebSocket.
    """
    # Verify allowed to message
    allowed_roles = await get_allowed_roles(current_user.role)
    user_query = select(User).where(User.id == other_user_id)
    result = await db.execute(user_query)
    receiver = result.scalar_one_or_none()
    
    if not receiver or receiver.role not in allowed_roles:
        return None

    new_msg = Message(
        sender_id=current_user.id,
        receiver_id=other_user_id,
        content=content
    )
    db.add(new_msg)
    await db.commit()
    await db.refresh(new_msg)

    msg_data = {
        "type": "new_message",
        "id": new_msg.id,
        "sender_id": new_msg.sender_id,
        "receiver_id": new_msg.receiver_id,
        "content": new_msg.content,
        "timestamp": new_msg.timestamp.isoformat(),
        "is_read": new_msg.is_read,
        "client_id": client_id
    }

    # Broadcast to receiver
    await manager.send_personal_message(msg_data, other_user_id)
    # Also to sender (if they have multiple tabs open)
    await manager.send_personal_message(msg_data, current_user.id)

    return new_msg

async def handle_websocket_message(db_factory, sender_id: int, data: dict):
    """
    Handles a message received through a WebSocket connection.
    Parses the data, saves the message to the database, and broadcasts it.
    """
    try:
        receiver_id = data.get("receiver_id")
        content = data.get("content")
        client_id = data.get("client_id")

        if not receiver_id or not content:
            return

        async with db_factory() as db:
            # Get sender object
            result = await db.execute(select(User).where(User.id == sender_id))
            sender = result.scalar_one_or_none()
            if not sender:
                return

            # Use existing send_message logic
            await send_message(db, sender, receiver_id, content, client_id=client_id)
            
    except Exception as e:
        # Log error but don't crash the WS loop
        import logging
        logging.error(f"Error handling WS message: {e}")
