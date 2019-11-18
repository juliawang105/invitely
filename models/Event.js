const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    name: {
        type: String,
        required: true
    },

    guest_emails: {
        type: Array,
        required: true
    }, 

    date: {
        type: Date,
        default: Date.now
    },

    location: {
        type: String,
        required: true
    }

});

const Event = mongoose.model('event', EventSchema);

module.exports = Event; 