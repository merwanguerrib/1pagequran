const User = require("../models/User");

const reinitializeAdvancement = async (recipient) => {
  const filter = { email: recipient.email };
  const reinitialize = { advancement: 1 };

  let user = await User.findOneAndUpdate(filter, reinitialize, {
    new: true,
  });
  await user.save();
};
module.exports = reinitializeAdvancement;
