const { Server } = require("socket.io");
const Message = require("./models/Message");
const queue = require("./queue");

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // Consume messages from RabbitMQ and broadcast to room
  queue.consume(async (data) => {
    const msg = new Message(data);
    await msg.save();
    io.to(data.room).emit("message", {
      user: data.user,
      content: data.content,
      room: data.room,
      createdAt: msg.createdAt,
    });
  });

  io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);

    socket.on("join", (room) => {
      socket.join(room);
      socket.emit("joined", { room });
    });

    socket.on("sendMessage", ({ room, user, content }) => {
      // Publish to queue instead of saving directly
      queue.publish({ room, user, content });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket };
