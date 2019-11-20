const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: "events"
  },
  status: {
    type: String,
    default: "invited"
  }
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Reservation = mongoose.model("reservation", ReservationSchema);
