const express = require('express');

const router = express.Router();

const Comment = require('../models/comment');


router.get('/', (req, res) => {

    Comment.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:stock', (req, res) => {
    Comment.find(req.params)
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/highest/comment', (req, res) => {

    Comment.aggregate([
        {"$group" : {_id:{ stock:"$stock"}, count:{$sum:1}}},
        {$sort:{"count":-1 , "_id":1}},{$project:{array:true, count:true, _id:true}}
    ]).limit(10).then((data) => {
        //console.log('Data: ', data);
        res.json(data);//data[1]._id.stock
    })
    .catch((error) => {
        console.log('error: ', daerrorta);
    });

});

router.post('/save', (req, res) => {
    const data = req.body;

    const newComment = new Comment(data);

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