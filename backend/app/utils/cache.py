import redis.asyncio as redis
import json
import os
import functools
from typing import Any, Optional
from fastapi.encoders import jsonable_encoder
from dotenv import load_dotenv

load_dotenv()

# Redis configuration
REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379")
redis_client = redis.from_url(REDIS_URL, decode_responses=True)

async def get_cache(key: str) -> Optional[Any]:
    """Get data from Redis cache."""
    try:
        data = await redis_client.get(key)
        if data:
            return json.loads(data)
    except Exception as e:
        print(f"Redis get error: {e}")
    return None

async def set_cache(key: str, value: Any, ttl: int = 3600):
    """Set data in Redis cache with an optional TTL (default 1 hour)."""
    try:
        # Use jsonable_encoder to handle Pydantic models, etc.
        serializable_value = jsonable_encoder(value)
        await redis_client.set(key, json.dumps(serializable_value), ex=ttl)
    except Exception as e:
        print(f"Redis set error: {e}")

async def delete_cache(key: str):
    """Delete a key from Redis cache."""
    try:
        await redis_client.delete(key)
    except Exception as e:
        print(f"Redis delete error: {e}")

async def clear_cache_pattern(pattern: str):
    """Clear all keys matching a pattern."""
    try:
        keys = await redis_client.keys(pattern)
        if keys:
            await redis_client.delete(*keys)
    except Exception as e:
        print(f"Redis pattern delete error: {e}")

def cache_response(key_prefix: str, ttl: int = 3600):
    """
    Decorator to cache the response of a FastAPI endpoint.
    Usage: @cache_response("jobs_list", ttl=600)
    """
    def decorator(func):
        @functools.wraps(func)
        async def wrapper(*args, **kwargs):
            # Generate a unique key based on arguments
            # Filter out non-serializable objects like AsyncSession, Request, etc.
            serializable_kwargs = {}
            for k, v in kwargs.items():
                if isinstance(v, (str, int, float, bool, type(None), list, dict)):
                    serializable_kwargs[k] = v
            
            cache_key = f"{key_prefix}:{json.dumps(serializable_kwargs, sort_keys=True)}"
            
            # Try to get from cache
            cached_data = await get_cache(cache_key)
            if cached_data:
                return cached_data
            
            # Execute function
            result = await func(*args, **kwargs)
            
            # Store in cache
            if result:
                await set_cache(cache_key, result, ttl)
                
            return result
        return wrapper
    return decorator
