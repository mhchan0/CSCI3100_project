const express = require('express');

const router = express.Router();

const Comment = require('../models/user');


router.get('/', (req, res) => {

    Comment.find({  })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
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