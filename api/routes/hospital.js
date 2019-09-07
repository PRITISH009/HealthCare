const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

var Hospital = require('../models/hospital');

//Setting Connection with MongoDb Atlas 
mongoose.connect('mongodb+srv://' + process.env.User+':' + process.env.Pass + '@healthcluster-gawcq.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser : true});

//Here All the apis related to hospitals will be defined
router.get('/', (req, res) => {
    res.status(200).send('All Routes related to finding Hospitals will be defined here');
})

module.exports = router;