const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    event: {
        type: Schema.Types.ObjectId,
        ref: 'event'
    },

    body: {
        type: String,
        required: true
    }, 

    authorFirst: {
        type: String,
        // required: true
    },

    authorLast: {
        type: String,
    },

    date: {
        type: Date,
        default: Date.now
    }

});

const Post = mongoose.model('post', PostSchema);

module.exports = Post; 
