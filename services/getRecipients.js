const User = require("../models/User");

// Get all users email and push it to usersEmail array

var recipients = [];

const getRecipients = async () => {
  users = await User.find();
  users.map(user => {
    recipients.push({ email: user.email, advancement: user.advancement });
  });
  return recipients;
};

module.exports = getRecipients;
