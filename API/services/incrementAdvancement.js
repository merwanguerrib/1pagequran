const User = require("../models/User");

const incrementAdvancement = async recipient => {
  const filter = { email: recipient.email };
  const update = { advancement: recipient.advancement + 1 };

  let user = await User.findOneAndUpdate(filter, update, {
    new: true
  });
  await user.save();
};
module.exports = incrementAdvancement;
