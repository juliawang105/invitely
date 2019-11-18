const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Event = require("../../models/Event");
const validateEventInput = require("../../validation/events");

router.get("/test", (req, res) => res.json({ msg: "This is the events route" }));

router.get("/", (req, res) => {
    Event
        .find()
        .sort({ date: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(400).json(err))
});



module.exports = router;