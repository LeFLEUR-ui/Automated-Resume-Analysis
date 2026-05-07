from sqlalchemy.ext.asyncio import AsyncSession
from app.models.audit_log import AuditLog
from sqlalchemy import select
from typing import List

async def record_activity(
    db: AsyncSession, 
    user_id: int, 
    action: str, 
    target: str = None, 
    details: str = None, 
    ip_address: str = None
):
    new_log = AuditLog(
        user_id=user_id,
        action=action,
        target=target,
        details=details,
        ip_address=ip_address
    )
    db.add(new_log)
    await db.commit()
    return new_log

async def get_recent_hr_activities(db: AsyncSession, limit: int = 10) -> List[AuditLog]:
    from sqlalchemy.orm import selectinload
    from app.models.user import User
    
    # Filter for users who are NOT ADMINS (or just get all and filter by role if needed)
    # For now, let's just get all audit logs and load user info
    result = await db.execute(
        select(AuditLog)
        .options(selectinload(AuditLog.user))
        .order_by(AuditLog.created_at.desc())
        .limit(limit)
    )
    return result.scalars().all()
