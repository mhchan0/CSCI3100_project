const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const StockSchema = new Schema({
    Symbol: String,
    Name: String
});

const Stock = mongoose.model('Stock', StockSchema);

module.exports =  Stock;