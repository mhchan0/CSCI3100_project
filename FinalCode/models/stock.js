/**
 * PROGRAM stock.js - Program for defining stock schema 
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To define stock schema of the website
 * 
 */
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StockSchema = new Schema({
    Symbol: String,
    Name: String
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports =  Stock;