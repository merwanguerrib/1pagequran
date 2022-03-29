const { ErrorHandler } = require("../helpers/error");
const crypto = require("crypto");
const Token = require("../models/Token");
const sendConfirmationEmail = require("../services/sendConfirmationEmail");

const createToken = async (req, res, next, newUser) => {
  try {
    let token = new Token({
      _userId: newUser._id,
      token: crypto.randomBytes(16).toString("hex"),
    });
    token.save(async (err) => {
      if (err) {
        throw new ErrorHandler(error.statusCode, error.message);
      }
      try {
        await sendConfirmationEmail(req, res, next, newUser, token);
      } catch (error) {
        console.log("CreateToken, Try sendConfirmationEmail catch error");
        throw new ErrorHandler(error.statusCode, error.message);
      }
    });
  } catch (error) {
    console.log("CreateToken catch error");
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = createToken;
