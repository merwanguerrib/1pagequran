const request = require("request");

const sendMail = async options => {
  request(options);
};

module.exports = sendMail;
