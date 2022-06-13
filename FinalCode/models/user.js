/**
 * PROGRAM user.js - Program for defining user schema 
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To define user schema of the website
 * 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const UserShema = new Schema({
    username: String,
    email: String,
    password: String,
    usertype: Number,
    theme: Number,
    photo: String
});

const User = mongoose.model('User', UserShema);

module.exports =  User;