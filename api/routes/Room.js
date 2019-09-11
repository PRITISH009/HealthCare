const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Room = require('../models/room');
const Booking = require('../models/booking');

const Hospital = require('../middleware/hospital_middleware');
const hospital = require('../models/hospital');

router.post('/book', Hospital, (req, res) => {
    console.log(req.data);
    var index;
    if(req.body.index === 0)
    {
        index = 0;
    }
    else{
        index = req.body.index; 
    }

    Room.findOneAndUpdate({$and : [{hosp_id : req.data[index]._id}, {room_type : req.body.facility}, {status : false}]}, {$set : {status : true}}, {new : true},(err, doc)=> {
        if(err)
        {
            console.log(err);
            res.status(500).json({"message" : err});
        }
        else{
            var new_booking = new Booking({
                _id : new mongoose.Types.ObjectId(),
                hosp_id : doc.hosp_id,
                room_no : doc.room_no,
                req_type : req.body.req_type,
                room_type : req.body.facility
            })

            new_booking.save((err, doc) => {
                if(err)
                {
                    console.log(err);
                    res.status(500).send(err);
                }
                else{
                    console.log(doc);
                    var facility_params = "facilities." + req.body.facility + ".available";
                    hospital.updateOne({_id : doc.hosp_id}, {$inc : {[facility_params] : -1}
                    }, (err, data) => {
                        if(err){
                            console.log(err);
                        }
                        else{
                            console.log(data);
                        }
                    });
                    res.status(200).json(doc);
                }
            });
        }
    });
});


router.post('/unbook', (req, res)=>{
    console.log(req.body._id);
    Booking.findOne({_id : req.body._id}, (err, data) => {
        if(err)
        {
            console.log(err);
            res.status(500).json(err);
        }
        else if(data === null)
        {
            res.send("No such booking id found");
        }
        else{
            console.log(data);
            if(data.req_type === 'RED')
            {
                res.status(200).json({"data" : data, "message" : "You don't have the previledge to unbook this room"});
            }
            else{
                Room.findOneAndUpdate({$and : [{ hosp_id : data.hosp_id}, {room_no : data.room_no}]}, {$set : {status : false}}, {new : true}, (err, update_res) => {
                    if(err)
                    {
                        console.log(err);
                        res.status(502).send("Please Try Again");
                    }
                    else{
                        // console.log(update_res);
                        var field = "facilities." + data.room_type + ".available";
                        console.log(field);
                        hospital.updateOne({_id : data.hosp_id}, {$inc : {[field] : 1}}, (err, final)=>{
                            if(err){
                                console.log(err);
                                res.status(500).send("Couldn't be sent");
                            }
                            else{
                                console.log(data._id);
                                Booking.findByIdAndRemove(data._id, (err, booking)=>{
                                    if(err){
                                        return res.status(500).send(err);
                                    }
                                    else{
                                        const response = {
                                            "message" : "Deleted Successfully",
                                        }
                                        return res.status(200).send(response);
                                    }
                                })
                            }
                        });
                    }
                });
            }
        }
    });
});

router.get('/', (req,res)=>{
    hospital.findOne({_id : 101}, (err, data)=>{
        if(err){console.log(err); 
            res.send(err);
        }
        else{
            res.send(data);
        }
    })
})

module.exports = router;