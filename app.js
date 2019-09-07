const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Hospital_Routes = require('./api/routes/hospital');
const Room_Routes = require('./api/routes/Room');

app.use('/hospital', Hospital_Routes);
app.use('/book', Room_Routes);

app.get('/', (req, res) => {
    res.send('Its Working!!');
})

module.exports = app;
