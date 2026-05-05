import redis
from app.config import settings

pool = redis.ConnectionPool.from_url(settings.redis_url, decode_responses=True)

def get_redis():
    return redis.Redis(connection_pool=pool)

HIT_KEY_PREFIX = "hits:"
URL_KEY_PREFIX  = "url:"
CACHE_TTL = 3600  # 1 hour

def cache_url(client: redis.Redis, key: str, target: str):
    client.setex(f"{URL_KEY_PREFIX}{key}", CACHE_TTL, target)

def get_cached_url(client: redis.Redis, key: str) -> str | None:
    return client.get(f"{URL_KEY_PREFIX}{key}")

def increment_hits(client: redis.Redis, key: str) -> int:
    return client.incr(f"{HIT_KEY_PREFIX}{key}")
