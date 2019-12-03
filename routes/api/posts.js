const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Post = require("../../models/Post");
const validatePostInput = require("../../validation/posts");
mongoose.set("useFindAndModify", false)

router.get("/test", (req, res) => res.json({ msg: "This is the posts route" }));

router.get("/event/:event_id", (req, res) => {
  //post index
  Post.find({ event: req.params.event_id })
    // .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json(err));
});

// router.get("/post/:post_id", (req, res) => { //post show page 
//    Post.find({ post: req.params.post_id })
//         .then(posts => res.json(posts))
//         .catch(err => res.status(400).json(err));

// });

router.patch("/:id", (req, res, next ) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

  
    Post.findOneAndUpdate(req.params.id,
        req.body,
        // console.log(req.body),
        { new: true })
        .then((post) => {
            res.json(post);
        } )
        
    }
)

router.get("/:id", (req, res) => { //post show 
   Post.findById(req.params.id)
        .then(post => res.json(post))
        .catch(err => res.status(400).json(err));
});

router.post(
  "/event/:event_id", //create post
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      body: req.body.body,
      event: req.params.event_id,
      authorFirst: req.body.authorFirst,
      authorLast: req.body.authorLast,
    });

    newPost.save().then(post => res.json(post));
  }
);

router.delete("/:id", (req, res) => {
  Post.findByIdAndRemove(req.params.id, function (err, post) {
    if (err)
      return res.status(500).send("There was a problem deleting the post.");
    res.status(200).send(post);
  });
});

module.exports = router;