/**
 * PROGRAM bookmark.api.js - Program for making bookmark database request
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To make bookmark database request
 * 
 */

const express = require('express');

const router = express.Router();

const Bookmark = require('../models/bookmark');


router.get('/', (req, res) => {

    Bookmark.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:username/:stock_asc', (req, res) => {//find stock symbol, sort in ascending order
    Bookmark.find({username: req.params.username}).sort({"stock": req.params.stock_asc})
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.route('/find/:username/:stock').get((req, res, next) => {
    try{//find the marked stock for a user
        Bookmark.findOne( {username: req.params.username, stock: req.params.stock}
            ,(error, data) => {
            if (error) {
                return next(error);
            } else {
                if (data !== null){
                    console.log('Data sd');
                    res.json(1);
                }else{
                    res.json(0);
                }
            }
            });
    }catch(error){
        return -1;
    }
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newBookmark = new Bookmark(data);

    newBookmark.save((error) => {
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
    try{//update bookmark
        Bookmark.findOneAndUpdate( {username: req.body.username, stock: req.body.stock} , {
            $set: req.body
            }, {
                new: true,
                upsert: true
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('bookmark updated !')
            }
            });
    }catch(error){
        return -1;
    }
});

router.route('/delete').put((req, res, next) => {
    try{//delete bookmark
        Bookmark.findOneAndDelete( {username: req.body.username, stock: req.body.stock},(error, data) => {
            if (error) {
                return next(error);
            } else {
                console.log('bookmark deleted !')
            }
            });
    }catch(error){
        return -1;
    }
});

module.exports = router;
