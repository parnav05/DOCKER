const amqp = require("amqplib");

let channel = null;
const QUEUE = process.env.RABBITMQ_QUEUE || "chat_messages";

async function connect() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
  await channel.assertQueue(QUEUE, { durable: true });
  console.log("RabbitMQ connected, queue:", QUEUE);
}

function publish(msg) {
  if (!channel) return;
  channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)), { persistent: true });
}

function consume(handler) {
  if (!channel) return;
  channel.consume(QUEUE, (msg) => {
    if (msg !== null) {
      handler(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }
  });
}

module.exports = { connect, publish, consume };
