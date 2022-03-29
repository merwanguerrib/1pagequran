require("dotenv").config();

const getRecipients = require("./getRecipients");
const createPage = require("./createPage");
const sendMail = require("./sendMail");
const incrementAdvancement = require("./incrementAdvancement");

const createMail = async () => {
  // Create recipients array
  const recipients = await getRecipients();

  // Iterate through recipients array
  recipients.map(async (recipient) => {
    // Set the page
    let pageObjectToRender = {
      srcUrl: "",
      verses: [],
    };

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
            to: [{ email: recipient.email }],
            dynamic_template_data: {
              pageObjectToRender: pageObjectToRender,
              subject:
                recipient.translationType === `en`
                  ? `Read the page ${recipient.advancement} today !`
                  : recipient.translationType === `fr`
                  ? `Lis la page ${recipient.advancement} aujourd'hui`
                  : null,
            },
          },
        ],
        from: "pageoftheday@1pagequran.com",
        reply_to: { email: "no-reply@1pagequran.com", name: "1PageQuran" },
        template_id: `${process.env.Template_ID}`,
      },
      json: true,
    };

    await createPage(recipient)
      .then((res) => {
        let page =
          options.body.personalizations[0].dynamic_template_data
            .pageObjectToRender;
        page = res;
        console.log(
          `recipient.email : ${recipient.email}`,
          `dynamic_template_data : ${JSON.stringify(
            options.body.personalizations[0].dynamic_template_data
              .pageObjectToRender
          )}`
        );
      })
      .catch((error) => {
        console.error(error);
      });

    try {
      sendMail(options);
    } catch (error) {
      console.error(error);
    } finally {
      await incrementAdvancement(recipient);
    }
  });
};

module.exports = createMail;
