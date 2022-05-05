/**
 * PROGRAM bookmark.js - Program for defining bookmark schema 
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To define bookmark schema of the website
 * 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const BookmarkSchema = new Schema({
    username: String,
    stock: String
});

const Bookmark = mongoose.model('Bookmark', BookmarkSchema);

module.exports =  Bookmark;