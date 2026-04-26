import asyncio
from app.utils.database import engine

async def init_db():
    async with engine.begin() as conn:
        from app.utils.database import Base
        # Recreate all tables
        await conn.run_sync(Base.metadata.create_all)
        print("Successfully recreated all database tables.")

if __name__ == "__main__":
    asyncio.run(init_db())
