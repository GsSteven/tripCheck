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
    const id = req.user._id;
    const { newListName, oldListName, changes, newItems, deletedItems } = req.body;
    User.findById(id)
        .then(response => {
            const currentListIndex = response.lists.findIndex(list => list.listName === oldListName);
            const currentList = response.lists[currentListIndex];
            //set new name
            if (newListName) currentList.listName = newListName;
            //delete items
            if (deletedItems[0]) {
                deletedItems.forEach(item => {
                    const itemIndex = currentList.list.findIndex(listItem => listItem.name === item);
                    currentList.list.splice(itemIndex, 1);
                })
            }
            //add changes to list
            if (changes[0]) {
                changes.forEach(change => {
                    const itemIndex = currentList.list.findIndex(item => item.name === change.oldValue);
                    const currentItem = currentList.list[itemIndex];
                    currentItem.name = change.value;
                })
            }
            //add new items list list array
            if (newItems[0]) {
                newItems.forEach(item => {
                    currentList.list.unshift({ name: item, checked: false });
                })
            }
            response.markModified('lists');
            response.save();
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        });
});

router.delete('', verifyToken, (req, res) => {

});

//post to reset list
router.post('/reset', verifyToken, (req, res) => {
    const id = req.user._id;
    const listName = req.body.name;
    User.findById(id)
        .then(response => {
            const currentListIndex = response.lists.findIndex(list => {
                return list.listName === listName;
            });
            const currentList = response.lists[currentListIndex];
            currentList.list.forEach(item => {
                if (item.checked) item.checked = false;
            });
            response.markModified('lists');
            response.save();
            res.sendStatus(200);
        })
        .catch(error => {
            console.error(error);
            res.sendStatus(400);
        })
})

module.exports = router;