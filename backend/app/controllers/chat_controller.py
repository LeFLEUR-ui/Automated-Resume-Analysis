from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, desc
from typing import List, Optional

from app.utils.database import get_db
from app.utils.auth import get_current_user, SECRET_KEY, ALGORITHM
from app.models.user import User
from app.models.message import Message
from app.schemas.message_schema import MessageCreate, MessageResponse, ChatContactResponse, ChatUser
from app.utils.websocket import manager
from jose import jwt, JWTError

router = APIRouter(prefix="/chat", tags=["Chat"])

async def verify_token(token: str, db: AsyncSession):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        if not email:
            return None
        result = await db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()
    except JWTError:
        return None

async def get_current_user_obj(payload: dict = Depends(get_current_user), db: AsyncSession = Depends(get_db)):
    email = payload.get("sub")
    result = await db.execute(select(User).where(User.email == email))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=401, detail="User not found")
    return user

async def get_allowed_roles(user_role: str) -> List[str]:
    role = user_role.upper()
    if role == "CANDIDATE":
        return ["HR"]
    elif role == "HR":
        return ["CANDIDATE", "ADMIN", "HR"]
    elif role == "ADMIN":
        return ["HR"]
    return []

@router.get("/contacts", response_model=ChatContactResponse)
async def get_contacts(
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
    allowed_roles = await get_allowed_roles(current_user.role)
    if not allowed_roles:
        return ChatContactResponse(users=[])

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
    return ChatContactResponse(users=chat_users)


@router.get("/messages/{other_user_id}", response_model=List[MessageResponse])
async def get_messages(
    other_user_id: int,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
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
    messages = result.scalars().all()
    return messages


@router.post("/messages/{other_user_id}", response_model=MessageResponse)
async def send_message(
    other_user_id: int,
    msg_in: MessageCreate,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
    # Verify allowed to message
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

    msg_data = {
        "type": "new_message",
        "id": new_msg.id,
        "sender_id": new_msg.sender_id,
        "receiver_id": new_msg.receiver_id,
        "content": new_msg.content,
        "timestamp": new_msg.timestamp.isoformat(),
        "is_read": new_msg.is_read
    }

    # Broadcast to receiver
    await manager.send_personal_message(msg_data, other_user_id)
    # Also to sender (if they have multiple tabs open)
    await manager.send_personal_message(msg_data, current_user.id)

    return new_msg


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, token: str = Query(...), db: AsyncSession = Depends(get_db)):
    user = await verify_token(token, db)
    if not user:
        await websocket.close(code=1008)
        return

    await manager.connect(websocket, user.id)
    try:
        while True:
            data = await websocket.receive_text()
            # If clients send messages via WS, handle here. But we use HTTP for sending.
            # We just keep connection open.
    except WebSocketDisconnect:
        manager.disconnect(websocket, user.id)
        await manager.broadcast_status(user.id, False)
