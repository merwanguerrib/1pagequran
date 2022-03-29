const { ErrorHandler } = require("../helpers/error");
const User = require("../models/User");
const createToken = require("../services/createToken");

const createUser = async (req, res, next) => {
  try {
    const { email, translationType } = req.body;
    const newUser = new User({
      email: email,
      advancement: 1,
      translationType: translationType,
    });
    newUser.save(async (err) => {
      if (err) {
        throw new ErrorHandler(err.statusCode, err.message);
      }
      try {
        await createToken(req, res, next, newUser);
      } catch (error) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
    });
    next();
  } catch (error) {
    next(error);
    console.log("CreateUser error");
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = createUser;
