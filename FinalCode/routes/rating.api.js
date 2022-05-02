const express = require('express');

const router = express.Router();

const Rating = require('../models/rating');


router.get('/', (req, res) => {
    //find all ratings
    Rating.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/all/:stock', (req, res) => {
    Rating.find(req.params)//find ratings of a stock
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.get('/:stock/:username', (req, res) => {//find ratings of a stock with particular username
    Rating.findOne({username: req.params.username, stock: req.params.stock})
        .then((data) => {
            //console.log('Data: ', data);
            if (data !== null){
                res.json(data.rating);
            }else{
                res.json(0);
            }
            
        })
        .catch((error) => {
            console.log('error: ', error);
        });
});

router.post('/save', (req, res) => {//save rating 
    const data = req.body;

    const newComment = new Rating(data);
    
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
    try{//update rating 
        Rating.findOneAndUpdate( {username: req.body.username, stock: req.body.stock} , {
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