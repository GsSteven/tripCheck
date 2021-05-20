const express = require('express');
const verifyToken = require('./verifyToken');
const User = require('./../models/TripsListUser');
const router = express.Router();

router.get('', verifyToken, (req, res) => {
    const id = req.user._id;
    User.findById(id)
        .then(response => {
            res.status(200).send(response.lists);
        })
        .catch(error => {
            res.sendStatus(400);
        })
});

router.post('', verifyToken, (req, res) => {
    const id = req.user._id;
    const data = req.body;

    User.findById(id)
        .then(response => {
            response.lists.unshift(data);
            response.save();
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        })
});

router.put('', verifyToken, (req, res) => {

});

router.delete('', verifyToken, (req, res) => {

});

module.exports = router;