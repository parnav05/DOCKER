from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
import shortuuid

from app.database import get_db
from app.cache import get_redis, cache_url, get_cached_url, increment_hits
from app import models, schemas
from app.config import settings

router = APIRouter()

@router.post("/shorten", response_model=schemas.URLResponse, status_code=201)
def shorten_url(payload: schemas.URLCreate, db: Session = Depends(get_db)):
    key = payload.custom_key or shortuuid.uuid()[:8]
    existing = db.query(models.URL).filter(models.URL.key == key).first()
    if existing:
        raise HTTPException(status_code=409, detail="Key already taken")

    url = models.URL(key=key, target=str(payload.target))
    db.add(url)
    db.commit()
    db.refresh(url)

    rc = get_redis()
    cache_url(rc, key, str(payload.target))

    return {**url.__dict__, "short_url": f"{settings.base_url}/{key}"}

@router.get("/urls", response_model=list[schemas.URLResponse])
def list_urls(skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    urls = db.query(models.URL).offset(skip).limit(limit).all()
    return [{**u.__dict__, "short_url": f"{settings.base_url}/{u.key}"} for u in urls]

@router.get("/urls/{key}", response_model=schemas.URLResponse)
def get_url(key: str, db: Session = Depends(get_db)):
    url = db.query(models.URL).filter(models.URL.key == key).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    return {**url.__dict__, "short_url": f"{settings.base_url}/{url.key}"}

@router.delete("/urls/{key}", status_code=204)
def delete_url(key: str, db: Session = Depends(get_db)):
    url = db.query(models.URL).filter(models.URL.key == key).first()
    if not url:
        raise HTTPException(status_code=404, detail="URL not found")
    db.delete(url)
    db.commit()

@router.get("/{key}")
def redirect_url(key: str, db: Session = Depends(get_db)):
    rc = get_redis()
    target = get_cached_url(rc, key)
    if not target:
        url = db.query(models.URL).filter(models.URL.key == key).first()
        if not url:
            raise HTTPException(status_code=404, detail="Short URL not found")
        target = url.target
        cache_url(rc, key, target)

    increment_hits(rc, key)
    db.query(models.URL).filter(models.URL.key == key).update({"clicks": models.URL.clicks + 1})
    db.commit()

    return RedirectResponse(url=target, status_code=302)
