const express = require('express');

const router = express.Router();

const Stock = require('../models/stock');

router.get('/', (req, res) => {

    Stock.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:Symbol', (req, res) => {
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

router.get('/search/:Symbol', (req, res) => {
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

router.get('/find/:Symbol', (req, res) => {

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

router.post('/save', (req, res) => {
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
    try{
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
    }catch{
        return -1;
    }
});


module.exports = router;