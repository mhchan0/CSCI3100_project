const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserShema = new Schema({
    username: String,
    email: String,
    password: String,
    usertype: Number,
    /*
    front_size: {
        type: Number,
        default: 1
    },
    */
    theme: Number,
    photo: String
});

const User = mongoose.model('User', UserShema);

module.exports =  User;