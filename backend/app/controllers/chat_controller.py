from app.services import chat_service
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

# --- Routes ---

@router.get("/contacts", response_model=ChatContactResponse)
async def get_contacts(
    search: Optional[str] = None,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
    chat_users = await chat_service.fetch_chat_contacts(db, current_user, search)
    return ChatContactResponse(users=chat_users)

@router.get("/messages/{other_user_id}", response_model=List[MessageResponse])
async def get_messages(
    other_user_id: int,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
    return await chat_service.get_messages_history(db, current_user.id, other_user_id)

@router.post("/messages/{other_user_id}", response_model=MessageResponse)
async def send_message(
    other_user_id: int,
    msg_in: MessageCreate,
    current_user: User = Depends(get_current_user_obj),
    db: AsyncSession = Depends(get_db)
):
    # Save to DB via service
    new_msg = await chat_service.store_new_message(db, current_user, other_user_id, msg_in)

    # Broadcast logic (Handled in Router)
    msg_data = {
        "type": "new_message",
        "id": new_msg.id,
        "sender_id": new_msg.sender_id,
        "receiver_id": new_msg.receiver_id,
        "content": new_msg.content,
        "timestamp": new_msg.timestamp.isoformat(),
        "is_read": new_msg.is_read
    }

    await manager.send_personal_message(msg_data, other_user_id)
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
            await websocket.receive_text()
    except WebSocketDisconnect:
        manager.disconnect(websocket, user.id)
        await manager.broadcast_status(user.id, False)