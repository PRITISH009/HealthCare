const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = require('../models/room');
const Booking = require('../models/booking');
const hospital = require('../models/hospital');


router.get('/', (req, res)=>{
    Room.updateMany({status : true}, {$set : {status : false}}).exec();
    Booking.remove({}).exec();
    
    hospital.find({}, (err, data) => {
        if(err){
            console.log(err);
        }
        else{
            data.forEach((obj)=>{
                hospital.updateOne({_id : obj._id}, {$set : {"facilities.ICU.available" : obj.facilities.ICU.total, 
                "facilities.Burn_Unit.available" : obj.facilities.Burn_Unit.total,
                "facilities.Radiology.available" : obj.facilities.Radiology.total,
                "facilities.CCU.available" : obj.facilities.CCU.total
            }}).exec();
            });
        }
    })

    res.send('Success');
});


module.exports = router;