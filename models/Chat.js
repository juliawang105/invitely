const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  event: {
    type: Schema.Types.ObjectId,
    ref: "event"
  },

  message: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
});

const Chat = mongoose.model("chat", ChatSchema);

module.exports = Chat;
