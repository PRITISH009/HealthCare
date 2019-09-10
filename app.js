const express = require('express');
const app = express();
const body_parser = require('body-parser');

const Room_Routes = require('./api/routes/Room');
const reset_routes = require('./api/routes/reset');

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));

app.use('/room', Room_Routes);
app.use('/reset', reset_routes);

app.use(body_parser.json());

app.get('/', (req, res) => {
    res.send('Its Working!!');
})


module.exports = app;
