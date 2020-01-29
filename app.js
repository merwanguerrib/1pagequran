require("dotenv").config();
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
// const hbs = require("hbs");
// const cors = require("cors");
const path = require("path");
const Page = require("./models/Page");
const request = require("request");

const app = express();

// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

app.listen(process.env.PORT, () =>
  console.log(`1pageQuran app listening on port ${process.env.PORT}!`)
);

app.use(express.json());

// Mongodb connection

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo ! Database name : ${x.connections[0].name}`
    );
  })
  .catch(err => {
    console.error(`Error connecting to Mongo ${err}`);
  });

// Variables to lookup the page number and the translation type

let pageNumber = 5;
let translationType = `en.hilali`;

// API Call to get the translation of the page related to pageNumber and translationType

const loadPageTranslationAxios = async () => {
  try {
    const response = await axios.get(
      `http://api.alquran.cloud/v1/page/${pageNumber}/${translationType}`
    );
    const ayahsArr = response.data.data.ayahs;
    let ayah = [];
    for (const ayahIndex of ayahsArr) {
      ayah.push({ number: ayahIndex.number, text: ayahIndex.text });
    }
    return ayah;
  } catch (error) {
    console.error(`loadPageTranslationAxios error : ${error.message}`);
  }
};

//Search in database for the url related to pageNumber

const retrieveUrlPage = async () => {
  let imgSrc = "";
  try {
    await Page.findOne({ number: pageNumber }).then(dbRes => {
      imgSrc = dbRes.image;
    });
    return imgSrc;
  } catch (error) {
    console.error(`Dbres error : `, error);
  }
};

// Create the email with the object to render and set the options of the Sendgrid request
var pageObjectToRender = {
  srcUrl: "",
  verses: []
};

var options = {
  method: "POST",
  url: "https://api.sendgrid.com/v3/mail/send",
  headers: {
    "content-type": "application/json",
    authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
  },
  body: {
    personalizations: [
      {
        to: [{ email: "merwanguerrib@gmail.com", name: "Merwan" }],
        dynamic_template_data: {
          pageObjectToRender: pageObjectToRender
        },
        subject: "📖 Read your page of the day 🤲"
      }
    ],
    from: { email: "pageoftheday@1pageofquran.com", name: "Merwan" },
    reply_to: { email: "pageoftheday@1pageofquran.com", name: "Merwan" },
    template_id: `${process.env.Template_ID}`
  },
  json: true
};

app.get("/", (req, res, next) => {
  const createPage = async pageObjectToRender => {
    await retrieveUrlPage()
      .then(srcUrl => {
        pageObjectToRender.srcUrl = srcUrl;
      })
      .catch(err => {
        console.error(err);
      });

    await loadPageTranslationAxios()
      .then(verses => {
        pageObjectToRender.verses = verses;
      })
      .catch(error => {
        console.error(`app.get "/" error : ${error.message}`);
      });
    // res.render("email", { pageObjectToRender });
    return pageObjectToRender;
  };
  const sendMail = async () => {
    await createPage(pageObjectToRender);

    await request(options, function(error, response, body) {
      console.log("error:", error); // Print the error if one occurred
      console.log("statusCode:", response && response.statusCode); // Print the response status code if a response was received
      console.log("body:", body);
    });
  };
  sendMail();
});

module.exports = app;
