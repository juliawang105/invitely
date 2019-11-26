const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");
mongoose.set("useFindAndModify", false)

// router.get("/test", (req, res) => res.json({ msg: "This is the events route" }));

router.get("/", (req, res) => { //event index
    Event.find()
      .sort({ date: -1 })
      .then(events => res.json(events))
      .catch(err => res.status(400).json(err));
});

router.get("/user/:user_id", (req, res) => { //user show page 
   Event.find({ user: req.params.user_id
        , time: { $gte: Date.now() }
    })
     .then(events => res.json(events))
     .catch(err => res.status(400).json(err));

});

router.patch("/:id", (req, res, next ) => {
    const { errors, isValid } = validateEventInput(req.body);
    console.log(req)

    if (!isValid) {
        return res.status(400).json(errors);
    }

    Event.findOneAndUpdate({_id: req.params.id},
        req.body,
        // console.log(req.body),
        { new: true })
        .then((event) => {
            // console.log(event);
            res.json(event);
        } );
        
    }
);

router.get("/:id", (req, res) => { //event show 
   Event.findById(req.params.id)
    
        .then(event => {
            // console.log(event)
            let newEvent = Object.assign({}, event._doc, {id: event.id});
            res.json(newEvent);
        })
        .catch(err => res.status(400).json(err));

})

router.post("/", //create post 
    passport.authenticate("jwt", { session: false }), (req, res) => {
        const { errors, isValid } = validateEventInput(req.body);

        if(!isValid){
            return res.status(400).json(errors);
        };

        const newEvent = new Event({
            user: req.user.id,
            name: req.body.name, 
            guest_emails: req.body.guest_emails,
            location: req.body.location,
            time: req.body.time,
            end_time: req.body.end_time,
            body: req.body.body,
            host: req.body.host,
            image_url: req.body.image_url
        });

        newEvent
        .save()
        .then(event => res.json(event));
    }
);



module.exports = router;