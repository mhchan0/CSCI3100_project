/**
 * PROGRAM bookmark.api.js - Program for making bookmark database request
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin, LUI, him
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To make bookmark database request
 * 
 */
const express = require('express');

const router = express.Router();

const Stock = require('../models/stock');

router.get('/', (req, res) => {
    //find all stocks
    Stock.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:Symbol', (req, res) => {//find one stock contains similar string in name or symbol(search bar)
    Stock.findOne({ "$or": [ {"Symbol" : { $regex: req.params.Symbol , $options: 'i'}}, 
    {"Name" : { $regex: req.params.Symbol , $options: 'i'}}]})
        .then((data) => {
            //console.log('Data: ', data);
            if (data !== null){
                //console.log('Data sd');
                res.json(data);
            }else{
                res.json(0);
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/search/:Symbol', (req, res) => {//find all stocks contain similar string in their names or symbols(search bar)
    Stock.find({ "$or": [ {"Symbol" : { $regex: req.params.Symbol , $options: 'i'}}, 
    {"Name" : { $regex: req.params.Symbol , $options: 'i'}}]})
        .then((data) => {
            //console.log('Data: ', data);
            if (data !== null){
                //console.log('Data sd');
                res.json(data);
            }else{
                res.json(0);
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/find/:Symbol', (req, res) => {//find one stock with stock symbol, return name

    Stock.findOne(req.params)
        .then((data) => {
            //console.log('Data: ', data);
            if (data !== null){
                //console.log('Data sd');
                res.json(data.Name);
            }else{
                res.json(0);
            }
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) => {//save stock
    const data = req.body;

    const newComment = new Stock(data);
    
    newComment.save((error) => {
        if (error) {
            res.status(500).json(err);
            return;
        }

        return res.json({
            msg: 'Your data has been saved.'
        });
    });
});



router.route('/update').put((req, res, next) => {
    try{//update a stock rating with username and stock symbol
        Stock.findOneAndUpdate( {username: req.body.username, stock: req.body.stock} , {
            $set: req.body
            }, {
                new: true,
                upsert: true
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('rating updated !')
            }
            });
    }catch(error){
        return -1;
    }
});


module.exports = router;
