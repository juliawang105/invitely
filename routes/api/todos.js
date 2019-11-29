const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");


const Todo = require("../../models/Todo");
const validateTodoInput = require("../../validation/todos");
mongoose.set("useFindAndModify", false);

router.get("/test", (req, res) => res.json({ msg: "This is the todos route" }));

router.get("/event/:event_id", (req, res) => {
  Todo.find({ event: req.params.event_id })
    .sort({ date: -1 })
    .then(todos => res.json(todos))
    .catch(err => res.status(400).json(err));
});

router.post(
  "/", //create post
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTodoInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newTodo = new Todo({
      body: req.body.body,
      event: req.body.event,
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


  Todo.findOneAndUpdate({ _id: req.params.id },
    req.body,
    { new: true })
    .then((todo) => {
      res.json(todo);
    });

  }
);

router.get("/", (req, res) => {
  Todo.find()
    .sort({date: -1})
    .then(todos => res.json(todos))
    .catch( err => 
      res.status(404).json({ notodosfound: "No todos found" })
    );
});


module.exports = router;