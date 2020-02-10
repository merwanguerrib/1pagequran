require("dotenv").config();

import express, { json as _json } from "express";

import mongooseConnection from "./services/mongoose/mongooseConnection";

import getRecipients from "./services/getRecipients";
import createPage from "./services/createPage";
import sendMail from "./services/sendMail";
import incrementAdvancement from "./services/incrementAdvancement";

const app = express();

app.listen(process.env.PORT, () =>
  console.log(`1pageQuran app listening on port ${process.env.PORT}!`)
);

app.use(_json());

// Mongodb connection
mongooseConnection();

const main = async () => {
  // Create recipients array
  const recipients = await getRecipients();

  // Iterate through recipients array
  recipients.map(async recipient => {
    // Set the page
    let pageObjectToRender = {
      srcUrl: "",
      verses: []
    };
    // Set the options of the email
    let options = {
      method: "POST",
      url: "https://api.sendgrid.com/v3/mail/send",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      },
      body: {
        personalizations: [
          {
            to: [{ email: recipient.email }],
            dynamic_template_data: {
              pageObjectToRender: pageObjectToRender
            },
            subject: `Read the page ${recipient.advancement} today !`
          }
        ],
        from: { email: "pageoftheday@1pageofquran.com", name: "Merwan" },
        reply_to: { email: "pageoftheday@1pageofquran.com", name: "Merwan" },
        template_id: `${process.env.Template_ID}`
      },
      asm: {
        group_id: 12519
      },
      json: true
    };

    await createPage(recipient)
      .then(res => {
        options.body.personalizations[0].dynamic_template_data.pageObjectToRender = res;
        //   console.log(
        //     `recipient.email : ${recipient.email}`,
        //     `dynamic_template_data : ${JSON.stringify(
        //       options.body.personalizations[0].dynamic_template_data
        //         .pageObjectToRender
        //     )}`
        //   );
      })
      .catch(error => {
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
main();

export default app;
