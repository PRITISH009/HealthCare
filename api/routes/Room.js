const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = require('../models/room');

//Setting Connection with MongoDb Atlas 
mongoose.connect('mongodb+srv://' + process.env.User+':' + process.env.Pass + '@healthcluster-gawcq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

// Here We will define the api for booking or unbooking a Room
router.get('/', (req, res) => {
    res.status(200).send('Redirection Complete');
})

module.exports = router;