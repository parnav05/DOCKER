# Project 2 — Real-time Chat App (Node.js + Express + Socket.IO)

## Stack
| Service   | Image                          | Port  |
|-----------|--------------------------------|-------|
| Express   | node:20-alpine                 | 3000  |
| Nginx     | nginx:alpine                   | 80    |
| MongoDB   | mongo:7                        | 27017 |
| RabbitMQ  | rabbitmq:3-management-alpine   | 5672, 15672 |

## Docker Compose Concepts Covered
- Nginx as reverse proxy (serving static files + proxying API + WebSocket upgrade)
- RabbitMQ message queue with management UI
- Bind mount for live server reload
- Multiple healthchecks (mongo + rabbitmq)
- Custom network for inter-service communication

## Quick Start
```bash
docker compose up --build

# Open the chat
open http://localhost:80

# RabbitMQ management UI
open http://localhost:15672
# login: guest / guest

docker compose down
```

## Project Structure
```
project2-nodejs-chat/
├── server/
│   ├── index.js          # Express + HTTP server entry
│   ├── socket.js         # Socket.IO + queue consumer
│   ├── queue.js          # RabbitMQ publish/consume
│   ├── db.js             # Mongoose connection
│   ├── models/
│   │   └── Message.js    # Message schema
│   └── routes/
│       └── messages.js   # REST history endpoint
├── frontend/
│   ├── index.html        # Chat UI
│   └── chat.js           # Socket.IO client
├── nginx/
│   └── nginx.conf        # Reverse proxy config
├── package.json
├── Dockerfile
├── docker-compose.yml
├── .env
└── README.md
```

## Key Learning Points
1. Nginx handles static frontend AND proxies `/api/` and `/socket.io/` — one public port (80)
2. Messages go through RabbitMQ queue before being saved to MongoDB
3. WebSocket upgrade headers must be set in nginx for Socket.IO to work
