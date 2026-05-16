const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    room:    { type: String, required: true, index: true },
    user:    { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
