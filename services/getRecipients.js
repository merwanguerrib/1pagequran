import User from "../models/User";

// Get all users email and push it to usersEmail array

var recipients = [];

const getRecipients = async () => {
  let users = await User.find();
  users.map(user => {
    recipients.push({ email: user.email, advancement: user.advancement });
  });
  return recipients;
};

export default getRecipients;
