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
            //check name does not exist
            const nameExists = response.lists.findIndex(list => list.listName === data.listName) !== -1;
            if (nameExists) {
                res.status(409).send(`List name ${data.listName} already exists`);
            } else {
                response.lists.unshift(data);
                response.save();
                res.status(200).send(`${data.listName} has been added!`);
            }
        })
        .catch(error => {
            console.error(error);
            res.status(400).send(`Error: ${data.listName} was not added`);
        })
});

router.put('', verifyToken, (req, res) => {

});

router.delete('', verifyToken, (req, res) => {
    const id = req.user._id;
    const listToDelete = req.query.name;
    User.findById(id)
        .then(response => {
            const listIndex = response.lists.findIndex(list => {
                return list.listName === listToDelete;
            });
            response.lists.splice(listIndex, 1);
            response.markModified('lists');
            response.save();
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        });
});

module.exports = router;