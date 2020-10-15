const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Adding a User
router.post("/signup", (req, res) => {
  const email = req.body.email;
  const translationType = req.body.translation;
  console.log(req.body);
  const newUser = new User({
    email: email,
    advancement: 1,
    translationType: translationType,
  });
  newUser
    .save()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(error);
    });
});

module.exports = router;
