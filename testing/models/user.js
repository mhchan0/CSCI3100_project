const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserShema = new Schema({
    username: String,
    email: String,
    password: String,
    status: String,
    front_size: {
        type: Number,
        default: 1
    },
    Theme: Number,
    photo: String
});

const User = mongoose.model('User', UserShema);

module.exports =  User;