require("dotenv").config();

const sendMail = require("./sendMail");

const { ErrorHandler } = require("../helpers/error");

const sendConfirmationEmail = async (req, res, next, newUser, token) => {
  // Set the options of the email
  let options = {
    method: "POST",
    url: process.env.SENGRID_MAIL_SEND_ENDPOINT,
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
    },
    body: {
      personalizations: [
        {
          to: [{ email: newUser.email }],
          dynamic_template_data: {
            confirmationLink: `${process.env.PUBLIC_URL}\/confirmation\/${token.token}`,
            subject:
              newUser.translationType === `en`
                ? `Please confirm your email address`
                : newUser.translationType === `fr`
                ? `Merci de confirmer votre adresse email`
                : null,
          },
        },
      ],
      from: { email: "pageoftheday@1pagequran.com", name: "1PageQuran" },
      reply_to: { email: "no-reply@1pagequran.com", name: "1PageQuran" },
      template_id: `${process.env.EmailConfirmationTemplate_ID}`,
    },
    json: true,
  };
  try {
    sendMail(options);
  } catch (error) {
    console.log("CreateToken catch error");
    throw new ErrorHandler(error.statusCode, error.message);
  }
};

module.exports = sendConfirmationEmail;
