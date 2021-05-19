const express = require('express');
const verifyToken = require('./verifyToken');
const User = require('./../models/TripsListUser');
const router = express.Router();

router.get('', verifyToken, (req, res) => {

});

router.post('', verifyToken, (req, res) => {
    const id = req.user._id;
    User.findById(id)
        .then(response => {

        })
});

router.put('', verifyToken, (req, res) => {

});

router.delete('', verifyToken, (req, res) => {

});

module.exports = router;