const mongoose = require('mongoose');

const room_schema = mongoose.Schema({
    hosp_id : {type : Number, required : true},
    room_no : {type : Number, required : true},
    room_type : {type : String, required : true},
    status : {type : Boolean, required : true}
}, {collection : "rooms"});

module.exports = mongoose.model('Room', room_schema);