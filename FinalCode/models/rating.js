const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentShema = new Schema({
    username: String,
    stock: String,
    rating: Number
});

const Rating = mongoose.model('Rating', CommentShema);

module.exports =  Rating;