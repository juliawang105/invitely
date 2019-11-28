const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new mongoose.Schema({

  event: {
    type: Schema.Types.ObjectId,
    ref: "event"
  },

  body: {
    type: String,
    required: true
  },

  done: {
    type: Boolean,
    default: false,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },
});

const Todo = mongoose.model("todo", TodoSchema);

module.exports = Todo;