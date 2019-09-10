const mongoose = require('mongoose');

const hospital_schema = mongoose.Schema({
    _id : { type : Number, required : true}, 
    hosp_name : {type : String, required : true},
    location : {
        type : {
            type : String,
            enum : ['Point'],
            required : true
        },
        coordinates : {
            type : [Number],
            required : true
        }
    },
    facilities : {
        type : Object,
        required : true
    }
}, {collection : "hospitals"});

module.exports = mongoose.model('Hospital', hospital_schema);