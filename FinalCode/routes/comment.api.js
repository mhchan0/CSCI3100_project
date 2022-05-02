const express = require('express');

const router = express.Router();

const Comment = require('../models/comment');


router.get('/', (req, res) => {
    //find all comments
    Comment.find({  })
        .then((data) => {
            
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:stock', (req, res) => {
    Comment.find(req.params)//find all comments of a stock
        .then((data) => {
            
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/highest/comment', (req, res) => {
    //get at most 10 stocks with highest number of comments
    Comment.aggregate([
        {"$group" : {_id:{ stock:"$stock"}, count:{$sum:1}}},
        {$sort:{"count":-1 , "_id":1}},{$project:{array:true, count:true, _id:true}}
    ]).limit(10).then((data) => {
        
        res.json(data);
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});

router.post('/save', (req, res) => {
    const data = req.body;

    const newComment = new Comment(data);
    //save comment
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

module.exports = router;