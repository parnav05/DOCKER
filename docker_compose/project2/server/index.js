require("dotenv").config();
const http    = require("http");
const express = require("express");
const cors    = require("cors");
const morgan  = require("morgan");
const { connect: dbConnect } = require("./db");
const { connect: mqConnect } = require("./queue");
const { initSocket } = require("./socket");
const messagesRouter = require("./routes/messages");

const app    = express();
const server = http.createServer(app);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_, res) => res.json({ status: "ok" }));
app.use("/api/messages", messagesRouter);

async function start() {
  await dbConnect();
  await mqConnect();
  initSocket(server);

  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

start().catch(console.error);
