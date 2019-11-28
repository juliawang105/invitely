const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


const Todo = require("../../models/Todo");
const validateTodoInput = require("../../validation/todos");
mongoose.set("useFindAndModify", false);

router.get("/test", (req, res) => res.json({ msg: "This is the todos route" }));

router.get("/event/:event_id", (req, res) => {
  //post index
  Post.find({ event: req.params.event_id })
    // .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err));
});

router.post(
  "/event/:event_id", //create post
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // console.log(req);
    const newTodo = new Todo({
      body: req.body.body,
      event: req.params.event_id,
      done: req.body.done
    });

    newTodo.save().then(todo => res.json(todo));
  }
);


module.exports = router;