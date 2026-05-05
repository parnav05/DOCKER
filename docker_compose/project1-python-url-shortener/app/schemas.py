from pydantic import BaseModel, HttpUrl
from datetime import datetime

class URLCreate(BaseModel):
    target: HttpUrl
    custom_key: str | None = None

class URLResponse(BaseModel):
    key: str
    target: str
    short_url: str
    clicks: int
    created_at: datetime

    class Config:
        from_attributes = True
