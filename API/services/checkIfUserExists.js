const checkIfUserExists = async (req, res, next) => {
  try {
    const { email, translationType } = req.body;
    if (!email || !translationType) {
      throw new ErrorHandler(
        404,
        "Missing required email and translation fields"
      );
    }
    const user = await db.User.findOne({ where: { email } });
    if (user) {
      throw new ErrorHandler(
        404,
        "User with the specified email already exists"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkIfUserExists;
