const mongoose = require("mongoose");

const connect = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

module.exports = { connect };
