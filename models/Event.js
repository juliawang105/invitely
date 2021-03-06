const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },

  host: {
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true
  },

  body: {
    type: String,
    required: true
  },

  time: {
    type: String,
    required: true
  },

  end_time: {
    type: String,
    required: true
  },

  guest_emails: {
    type: []
  },

  email: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now
  },

  location: {
    type: String,
    required: true
  },

  private: {
    type: Boolean,
    default: true,
    required: true
  },

  image_url: {
    type: String
  }
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event; 
