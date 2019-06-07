const mongoose = require('mongoose');
// Use global promise for mongoose
mongoose.Promise = global.Promise;

// make Schema
const commentSchema = new mongoose.Schema({
    author: {
        ref: 'User',
        required: 'A user is required!',
        type: mongoose.Schema.ObjectId,
    },
    comment: {
        required: 'Comment cannot be Empty!',
        trim: true,
        type: String,
    },
    created: {
        default: Date.now,
        type: Date,
    },
    topic: {
        ref: 'Topic',
        required: 'Comment should have a valid topic',
        type: mongoose.Schema.ObjectId,
    },
});

module.exports = mongoose.model('Comment', commentSchema);
