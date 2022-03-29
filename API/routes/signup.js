const express = require("express");

const router = express.Router();

const { ErrorHandler } = require("../helpers/error");

const checkIfUserExists = require("../services/checkIfUserExists");
const createUser = require("../services/createUser");

// Adding a User
router.post("/signup", async (req, res, next) => {
  try {
    await checkIfUserExists(req, res, next);
    try {
      await createUser(req, res, next);
    } catch (error) {
      console.log("Try createUser signup catch error");
      throw new ErrorHandler("500", error.message);
    }
  } catch (error) {
    console.log("Try checkIfUserExists signup catch errro");
    throw new ErrorHandler("500", error.message);
  }
});

module.exports = router;
