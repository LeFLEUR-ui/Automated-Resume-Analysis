from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class MessageCreate(BaseModel):
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    content: str
    timestamp: datetime
    is_read: bool

    class Config:
        from_attributes = True

class ChatUser(BaseModel):
    id: int
    fullname: str
    role: str
    profile_image_url: Optional[str] = None
    is_online: Optional[bool] = False
    last_message: Optional[str] = None
    last_message_time: Optional[datetime] = None
    unread_count: Optional[int] = 0

class ChatContactResponse(BaseModel):
    users: List[ChatUser]
