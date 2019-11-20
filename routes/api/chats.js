const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Chat = require('../../models/Chat');
const validateChatInput = require("../../validation/chats");
// mongoose.set("useFindAndModify", false);

// router.get("/test", (req, res) => res.json({ msg: "This is the chats route" }));

router.get("/event/:event_id", (req, res) => {
  console.log("working")
  Chat.find({ event: req.params.event_id })
    .sort({ date: -1 })
    .then(chats => res.json(chats))
    .catch(err => res.status(400).json(err));
});

router.post(
  "/event/:event_id", 
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChatInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newChat = new Chat({
      user: req.user.id,
      event: req.params.event_id,
      message: req.body.message,
    });

    newChat.save().then(chat => res.json(chat));
  }
);

module.exports = router;
