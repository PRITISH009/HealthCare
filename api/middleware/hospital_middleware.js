const Hospital = require('../models/hospital');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://' + process.env.User+':' + process.env.Pass + '@healthcluster-gawcq.mongodb.net/HealthCare?retryWrites=true&w=majority', {useNewUrlParser : true});

var criticality_radius = {
    6 : 0,
    5 : 0.03,
    4 : 0.05,
    3 : 0.08,
    2 : 0.13,
    1 : 0.15
}


module.exports = (req, res, next) => {
    var facility_param = "facilities." + req.body.facility + ".available";
    Hospital.find({$and : [
        {[facility_param] : {$gt : 0} },
        {
            "location" : {$geoWithin : {$centerSphere : [[req.body.x_coord,req.body.y_coord], criticality_radius[req.body.criticality]]}}
        },
        {
            "location" : {$not : {$geoWithin : {$centerSphere : [[req.body.x_coord,req.body.y_coord], criticality_radius[req.body.criticality+1]]}}}
        }
    ]
    }, (err, data) => {
        if(err)
        {
            console.log(err);
            res.status(500).send("Some Database related error has occured");
        }
        else if(data === [])
        {
            res.status(502).send("Please Connect to a Better Network and try Again");
        }
        else{
            req.data = data;
            next();
        }
    });


}