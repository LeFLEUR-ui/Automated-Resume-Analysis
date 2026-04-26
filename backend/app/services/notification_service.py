from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import update
import json
from app.models.notification import Notification
from app.schemas.notification_schema import NotificationCreate
from app.utils.websocket_manager import manager

async def create_notification(db: AsyncSession, title: str, message: str, type: str) -> Notification:
    new_notification = Notification(title=title, message=message, type=type)
    db.add(new_notification)
    await db.commit()
    await db.refresh(new_notification)
    
    # Broadcast to connected clients
    try:
        notification_data = {
            "id": new_notification.id,
            "title": new_notification.title,
            "message": new_notification.message,
            "type": new_notification.type,
            "created_at": new_notification.created_at.isoformat(),
            "is_read": False
        }
        await manager.broadcast(json.dumps(notification_data))
    except Exception as e:
        print(f"Error broadcasting notification: {e}")
        
    return new_notification

async def get_all_notifications(db: AsyncSession) -> list[Notification]:
    result = await db.execute(select(Notification).order_by(Notification.created_at.desc()).limit(50))
    return result.scalars().all()

async def mark_all_as_read(db: AsyncSession) -> bool:
    await db.execute(update(Notification).where(Notification.is_read == False).values(is_read=True))
    await db.commit()
    return True
