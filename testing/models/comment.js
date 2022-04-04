const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentShema = new Schema({
    username: String,
    body: String,
    stock: String,
    year: String,
    month: String,
    day: String
});

const Comment = mongoose.model('Comment', CommentShema);

module.exports =  Comment;