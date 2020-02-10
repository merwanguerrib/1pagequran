import request from "request";

const sendMail = async options => {
  request(options, function(error, response, body) {
    if (error) throw new Error(error);
    console.log("statusCode : ", response && response.statusCode);
  });
};

export default sendMail;
