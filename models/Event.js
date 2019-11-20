const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    name: {
        type: String,
        required: true
    },

    body: {
        type: String,
        require: true 
    },

    time: {
        type: String,
        require: true 
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
    }

});

const Event = mongoose.model('event', EventSchema);

module.exports = Event; 
