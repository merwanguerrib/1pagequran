const request = require("request");

const sendMail = async options => {
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("statusCode : ", response && response.statusCode);
  });
};

module.exports = sendMail;
