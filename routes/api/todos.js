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

router.delete("/:id", (req, res) => {
  Todo.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err)
      return res.status(500).send("There was a problem deleting the task.");
    res.status(200).send(todo);
  });
});

router.get("/:id", (req, res) => { 
  Todo.findById(req.params.id)
    .then(todo => res.json(todo))
    .catch(err => res.status(400).json(err));
});

router.patch("/:id", (req, res, next) => {
  const { errors, isValid } = validateTodoInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }


  Todo.findOneAndUpdate(req.params.id,
    req.body,
    // console.log(req.body),
    { new: true })
    .then((todo) => {
      console.log(todo);
      res.json(todo);
    });

  }
);


module.exports = router;