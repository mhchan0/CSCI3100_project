const express = require('express');

const router = express.Router();

const User = require('../models/user');


router.get('/', (req, res) => {

    User.find({  })
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/:username', (req, res) => {

    User.find(req.params)
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.get('/findemail/:email', (req, res) => {

    User.find(req.params)
        .then((data) => {
            //console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('error: ', daerrorta);
        });
});

router.post('/save', (req, res) => {
    const data = req.body;

    const newUser = new User(data);

    newUser.save((error) => {
        if (error) {
            res.status(500).json(err);
            return;
        }

        return res.json({
            msg: 'Your data has been saved.'
        });
    });
});

router.route('/uploadphoto').put((req, res, next) => {
    try{
        User.findOneAndUpdate( {username: req.body.username} , {
            photo: req.body.photo
            }, {
                new: true,
                upsert: true 
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Your photo has been updated.')
            }
            });
    }catch{
        return -1;
    }
    
});

router.route('/updatetheme').put((req, res, next) => {
    try{
        User.findOneAndUpdate( {username: req.body.username} , {
            theme: req.body.theme
            }, {
                new: true,
                upsert: true 
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Your theme has been updated.')
            }
            });
    }catch{
        return -1;
    }
    
});

router.route('/updatepwd').put((req, res, next) => {
    try{
        User.findOneAndUpdate( {username: req.body.username} , {
            password: req.body.password
            }, {
                new: true,
                upsert: true 
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Your theme has been updated.')
            }
            });
    }catch{
        return -1;
    }
    
});

router.route('/changeusertype').put((req, res, next) => {
    try{
        User.findOneAndUpdate( {username: req.body.username} , {
            usertype: req.body.usertype
            }, {
                new: true,
                upsert: true 
              },(error, data) => {
            if (error) {
                return next(error);
            } else {
                res.json(data)
                console.log('Your status has been updated.')
            }
            });
    }catch{
        return -1;
    }
    
});

module.exports = router;