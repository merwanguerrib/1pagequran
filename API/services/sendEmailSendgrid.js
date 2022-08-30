const request = require("request");

const sendEmailSendgrid = async (options) => {
  request(options, function (error, response, body) {
    body && console.log("sendmail.js body", body);
    if (error) throw new Error(error);
    console.log("sendMail.js statusCode : ", response && response.statusCode);
  });
};

module.exports = sendEmailSendgrid;
