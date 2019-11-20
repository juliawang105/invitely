const Validator = require("validator");
const validText = require("./valid-text");

module.exports = function validateReservationInput(data) {
  let errors = {};

  data.text = validText(data.status) ? data.status : "invited";

  if (!Validator.isIn(data.status, ["invited", "accepted", "declined", "maybe"])) {
    errors.text = "Reservation status must be invited, accepted, declined, or maybe";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
