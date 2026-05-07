import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

async def update_user_table():
    engine = create_async_engine(DATABASE_URL)
    
    async with engine.begin() as conn:
        print("Updating users table with status fields...")
        
        commands = [
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_archived BOOLEAN DEFAULT FALSE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT FALSE;",
            "ALTER TABLE users ADD COLUMN IF NOT EXISTS last_active TIMESTAMP WITHOUT TIME ZONE;"
        ]
        
        for command in commands:
            try:
                await conn.execute(text(command))
                print(f"Executed: {command}")
            except Exception as e:
                print(f"Error: {e}")
                
    await engine.dispose()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(update_user_table())
