from sqlalchemy import Column, String, Integer, DateTime, func
from app.database import Base

class URL(Base):
    __tablename__ = "urls"

    id       = Column(Integer, primary_key=True, index=True)
    key      = Column(String(20), unique=True, index=True, nullable=False)
    target   = Column(String(2048), nullable=False)
    clicks   = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
