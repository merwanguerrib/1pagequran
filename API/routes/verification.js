const express = require("express");

const router = express.Router();

const { ErrorHandler } = require("../helpers/error");
const Token = require("../models/Token");
const User = require("../models/User");

// Verify a User
router.get("/verification/:id/:token", async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    const token = await Token.findOne({
      _userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send("Invalid link");

    await User.updateOne({ _id: user._id, isVerified: true });
    await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    throw new ErrorHandler("400", err.message);
  }
});
module.exports = router;
