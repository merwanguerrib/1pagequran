const User = require("../models/User");
const { ErrorHandler } = require("../helpers/error");

const checkIfEmailAdressIsAssociated = async (req, res, next) => {
  const { email, translationType } = req.body;
  try {
    if (!email || !translationType) {
      throw new ErrorHandler(
        404,
        "Missing required email or translation fields"
      );
    }
    const user = await User.findOne({ email: email });
    if (user) {
      throw new ErrorHandler(
        403,
        `The email adress ${email} is already associated with an existing account`
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkIfEmailAdressIsAssociated;
