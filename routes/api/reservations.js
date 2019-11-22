const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

const Reservation = require("../../models/Reservation");
const validateReservationInput = require("../../validation/reservations");

router.get("/", (req, res) => {
  Reservation.find()
    .sort({ date: -1 })
    .then(reservations => res.json(reservations))
    .catch(err =>
      res.status(404).json({ noreservationsfound: "No reservations found" })
    );
});

router.get("/user/:email", (req, res) => {
  // console.log(req);
  console.log(req.params.email);
  // use email instead of user_id because email is always available
  Reservation.find({ email: req.params.email })
    .sort({ date: -1 })
    .then(reservations => res.json(reservations))
    .catch(err =>
      res.status(404).json({ noreservationsfound: "No reservations found from that user" })
    );
});

router.get("/event/:event_id", (req, res) => {
  Reservation.find({ event: req.params.event_id })
    .sort({ date: -1 })
    .then(reservations => res.json(reservations))
    .catch(err =>
      res.status(404).json({ noreservationsfound: "No reservations found on that event" })
    );
});

router.get("/:id", (req, res) => {
  Reservation.findById(req.params.id)
    .then(reservation => res.json(reservation))
    .catch(err =>
      res.status(404).json({ noreservationfound: "No reservation found with that ID" })
    );
});

router.delete("/:id", (req, res) => {
  Reservation.findByIdAndRemove(req.params.id, function(err, reservation) {
    if (err)
      return res.status(500).send("There was a problem deleting the reservation.");
    res.status(200).send(reservation);
  });
});

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateReservationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newReservation = new Reservation({
      user: req.body.user,
      email: req.body.email,
      event: req.body.event,
      status: req.body.status
    });

    newReservation.save().then(reservation => res.json(reservation));
  }
);

router.patch("/:id", (req, res, next) => {
    const { errors, isValid } = validateReservationInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Reservation.findOneAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).then(reservation => {
      res.json(reservation);
    });

  }
);

module.exports = router;
