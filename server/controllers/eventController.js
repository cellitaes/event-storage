const { validationResult } = require("express-validator");

const HttpError = require("../models/httpError");
const Event = require("../models/event");

const postEvent = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { firstName, lastName, email, eventDate } = req.body;

  const createdEvent = new Event({
    firstName,
    lastName,
    email,
    eventDate,
  });

  try {
    await createdEvent.save();
  } catch (err) {
    const error = new HttpError(
      "Creating event failed, please try again later.",
      500
    );
    return next(error);
  }

  res.status(201).json({ msg: "OK", createdEvent });
};

exports.postEvent = postEvent;
