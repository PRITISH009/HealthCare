const express = require('express');
const app = express();
const body_parser = require('body-parser');
const mongoose = require('mongoose');

const Room_Routes = require('./api/routes/Room');
const reset_routes = require('./api/routes/reset');


mongoose.connect('mongodb+srv://' + process.env.User+':' + process.env.Pass + '@healthcluster-gawcq.mongodb.net/HealthCare?retryWrites=true&w=majority', {useNewUrlParser : true});


console.log(mongoose.connection.readyState);

app.use(body_parser.json());
app.use(body_parser.urlencoded({extended : true}));

app.use('/room', Room_Routes);
app.use('/reset', reset_routes);

app.use(body_parser.json());

app.get('/dbstatus', (req, res, next) => {
    const state = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    res.status(200).json({dbstatus: state[mongoose.connection.readyState]});
})

app.get('/', (req, res) => {
    res.send('Its Working!!');
})


module.exports = app;
