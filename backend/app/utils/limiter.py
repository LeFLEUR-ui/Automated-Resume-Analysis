from slowapi import Limiter
from slowapi.util import get_remote_address
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize limiter
# We use get_remote_address as the default key to identify users
# If Redis is needed, we can pass it to the Limiter constructor via storage_uri
redis_url = os.getenv("REDIS_URL", "redis://localhost:6379")

limiter = Limiter(
    key_func=get_remote_address,
    storage_uri=redis_url,
    enabled=True
)
