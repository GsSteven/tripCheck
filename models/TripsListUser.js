const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    lists: {
        type: Array,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const TripCheckUser = mongoose.model("tripCheckUser", userSchema);

module.exports = TripCheckUser;
