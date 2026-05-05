# Project 1 — URL Shortener API (Python + FastAPI)

## Stack
| Service   | Image                | Port |
|-----------|----------------------|------|
| FastAPI   | python:3.12-slim     | 8000 |
| PostgreSQL| postgres:16-alpine   | 5432 |
| Redis     | redis:7-alpine       | 6379 |
| pgAdmin   | dpage/pgadmin4       | 5050 |

## Docker Compose Concepts Covered
- `depends_on` with `condition: service_healthy`
- `healthcheck` on postgres and redis
- Named volumes for data persistence
- `env_file` loading
- Custom bridge network
- Bind mount for hot-reload during dev

## Quick Start
```bash
# 1. Start all services
docker compose up --build

# 2. API docs
open http://localhost:8000/docs

# 3. pgAdmin
open http://localhost:5050
# login: admin@admin.com / admin

# 4. Shorten a URL
curl -X POST http://localhost:8000/shorten \
  -H "Content-Type: application/json" \
  -d '{"target": "https://google.com"}'

# 5. Stop everything
docker compose down

# 6. Stop and remove volumes (fresh start)
docker compose down -v
```

## Project Structure
```
project1-python-url-shortener/
├── app/
│   ├── main.py          # FastAPI app entry point
│   ├── config.py        # Settings via pydantic-settings
│   ├── database.py      # SQLAlchemy engine + session
│   ├── models.py        # ORM models
│   ├── schemas.py       # Pydantic schemas
│   ├── cache.py         # Redis helpers
│   └── routers/
│       └── urls.py      # All URL endpoints
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## Key Learning Points
1. `healthcheck` prevents app starting before DB is ready — better than `sleep`
2. Redis caches redirects so DB isn't hit on every click
3. Named volumes persist data across `docker compose down`
4. `env_file` keeps secrets out of docker-compose.yml
