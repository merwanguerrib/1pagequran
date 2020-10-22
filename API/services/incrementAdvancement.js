const User = require("../models/User");
const reinitializeAdvancement = require("./reinitializeAdvancement");

const incrementAdvancement = async (recipient) => {
  const filter = { email: recipient.email };
  const update = { advancement: recipient.advancement + 1 };
  if (recipient.advancement === 604) {
    reinitializeAdvancement(recipient);
  } else {
    let user = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
    await user.save();
  }
};
module.exports = incrementAdvancement;
