const mongoose = require('mongoose');

const room_schema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    room_no : {type : String, required : true},
    room_type : {type : String, required : true},
    Status : {type : Boolean, required : true}
}, {collection : "rooms"});

module.exports = mongoose.model('Room', room_schema);