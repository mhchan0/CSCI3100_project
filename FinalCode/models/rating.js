/**
 * PROGRAM rating.js - Program for defining rating schema 
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To define rating schema of the website
 * 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const CommentShema = new Schema({
    username: String,
    stock: String,
    rating: Number
});

const Rating = mongoose.model('Rating', CommentShema);

module.exports =  Rating;