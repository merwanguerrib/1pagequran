const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const { ErrorHandler } = require("../helpers/error");

const sendConfirmationEmail = async (req, res, next, newUser, token) => {
  const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key: process.env.SENDGRID_API_KEY,
      },
    })
  );
  let mailOptions = {
    from: "pageoftheday@1pagequran.com",
    to: newUser.email,
    subject: "Please confirm your email adress",
    html: `
    Hello, please verify your email adress : ${newUser.email}
    Click the following link : ${process.env.PUBLIC_URL}\/confirmation\/${token.token}
    Thank You!`,
  };
  transporter.sendMail(mailOptions, function (error) {
    if (error) {
      throw new ErrorHandler(error.statusCode, error.message);
    }
    console.log("mailOptions==>", mailOptions);
    return res.status(200).send(
      `A verification email has been sent to ${newUser.email}.
       It will expire after in 24h.
       If you did not get the verification email click on resend token.`
    );
  });
};

module.exports = sendConfirmationEmail;
