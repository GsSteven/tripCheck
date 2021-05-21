const express = require('express');
const verifyToken = require('./verifyToken');
const User = require('./../models/TripsListUser');
const router = express.Router();

router.get('', verifyToken, (req, res) => {

});

router.post('', verifyToken, (req, res) => {
    const id = req.user._id;
    const { name, itemName, checked } = req.body;
    User.findById(id)
        .then(response => {
            const currentListIndex = response.lists.findIndex(list => list.listName === name);
            const currentList = response.lists[currentListIndex].list;
            const currentItemIndex = currentList.findIndex(item => item.name === itemName);
            const currentItem = currentList[currentItemIndex];
            currentItem.checked = checked;
            response.markModified('lists');
            response.save();
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        });
});

router.put('', verifyToken, (req, res) => {

});

router.delete('', verifyToken, (req, res) => {

});

module.exports = router;