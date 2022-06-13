/**
 * PROGRAM comment.js - Program for defining comment schema 
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To define comment schema of the website
 * 
 */
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