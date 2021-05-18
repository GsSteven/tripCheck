require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;


//imported routes
const authRoute = require('./routes/auth');

//mongo connect
mongoose.connect(MONGO_URI || 'mongodb://localhost/tripCheck', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .catch(err => {
        console.log(err);
    });

mongoose.connection.on('connected', () => {
    console.log('connected to DB');
});

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//route middleware
app.use('/api/auth', authRoute);

//for production app
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static(path.join(__dirname, '/client/build')));

    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});