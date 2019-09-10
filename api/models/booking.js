const mongoose = require('mongoose');

const Booking_details_schema = mongoose.Schema({
    _id : {type : mongoose.Types.ObjectId, required : true},
    hosp_id : {type : Number, required : true},
    room_no : {type : Number, required : true},
    req_type : {type : String, enum : ['RED', 'YLO'], required : true},
    room_type : {type : String, required : true}
});

module.exports = mongoose.model('Booking', Booking_details_schema);