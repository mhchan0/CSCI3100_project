/**
 * PROGRAM user.api.js - Program for making user database request
 * PROGRAMMER: CHAN, Man Ho, LEE, Yan Hin
 * VERSION 1.0.0: written Apr 8, 2022
 * PURPOSE: To make user database request
 * 
 */
const express = require('express');

const router = express.Router();

const User = require('../models/user');


router.get('/', (req, res) => {
    //find all users
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
    //find user with username
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
    //find email
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
    //save
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
    try{//update icon of user
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
    }catch(error){
        return -1;
    }
    
});

router.route('/updatetheme').put((req, res, next) => {
    try{//update theme of user
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
    }catch(error){
        return -1;
    }
    
});

router.route('/updatepwd').put((req, res, next) => {
    try{//update password of user
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
    }catch(error){
        return -1;
    }
    
});

router.route('/changeusertype').put((req, res, next) => {
    try{//change user type of user
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
    }catch(error){
        return -1;
    }
    
});

module.exports = router;
