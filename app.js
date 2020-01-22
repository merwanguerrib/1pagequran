require("dotenv").config();
const axios = require("axios");
const express = require("express");
const mongoose = require("mongoose");
const hbs = require("hbs");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.listen(process.env.PORT, () =>
  console.log(`1pageQuran app listening on port ${process.env.PORT}!`)
);

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

const loadPageTranslationAxios = async () => {
  let pageNumber = 5;
  let translationType = `en.hilali`;
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

app.get("/", (req, res, next) => {
  loadPageTranslationAxios()
    .then(verses => {
      res.render("index", { list: verses });
    })
    .catch(error => {
      console.error(`app.get "/" error : ${error.message}`);
    });
  // ;
});

module.exports = app;
