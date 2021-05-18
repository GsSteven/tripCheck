require('dotenv').config();
const router = require('express').Router();
const User = require('../models/TripsListUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('./validation');

router.post('/register', async (req, res) => {
    const userInfo = req.body;
    const { name, email, password, password2 } = userInfo;

    //Verify both password inputs are same
    if (password !== password2) return res.status(400).send('Passwords do not match');

    //Validate user info
    const { error } = registerValidation(userInfo);
    if (error) return res.status(400).send(error.details[0].message);

    //Validate user is not in database
    const emailExists = await User.findOne({ email: email });
    if (emailExists) return res.status(400).send('Email is already registered');

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    //Create user
    const user = new User({
        name: name,
        email: email,
        password: hashedPass,
        lists: []
    });
    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser.name);
    } catch (err) {
        res.status(400).send();
    }
});

router.post('/login', async (req, res) => {
    const userInfo = req.body;
    const email = userInfo.email;
    const password = userInfo.password;

    //Validate user info
    const { error } = loginValidation(userInfo);
    if (error) return res.status(400).send(error.details[0].message);

    //Verify user is in DB
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).send('Email does not exist');

    //Validate password
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(400).send('Invalid password');

    //Create web token
    const TOKEN_KEY = process.env.TOKEN_KEY;
    //token expires in 1 year
    const token = jwt.sign({ _id: user._id }, TOKEN_KEY, { expiresIn: 31556926 });
    res.header('auth-token', token).send();
});


module.exports = router;