const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookmarkSchema = new Schema({
    username: String,
    stock: String
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports =  Bookmark;