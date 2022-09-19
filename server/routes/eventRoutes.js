const express = require("express");
const { check } = require("express-validator");

const router = express.Router();
const eventController = require("../controllers/eventController");

router.post(
  "/addEvent",
  [
    check("firstName").not().isEmpty().isLength({ min: 2 }),
    check("lastName").not().isEmpty().isLength({ min: 2 }),
    check("email").normalizeEmail().isEmail(),
    check("eventDate").custom((value) => {
      const currentDate = new Date().getTime();
      const minDate = new Date(value).getTime();
      if (minDate - currentDate < 0) {
        return Promise.reject("Incorrect date");
      }
      return true;
    }),
  ],
  eventController.postEvent
);

module.exports = router;
