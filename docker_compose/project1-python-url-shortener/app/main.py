from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import Base, engine
from app.routers import urls

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create all tables on startup
    Base.metadata.create_all(bind=engine)
    yield

app = FastAPI(
    title="URL Shortener API",
    description="A production-style URL shortener built with FastAPI + PostgreSQL + Redis",
    version="1.0.0",
    lifespan=lifespan,
)

app.include_router(urls.router, tags=["URLs"])

@app.get("/health")
def health():
    return {"status": "ok"}
