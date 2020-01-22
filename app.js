require("dotenv").config();
const axios = require("axios");

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo ! Database name "${x.connections[0].name}`);
  })
  .catch(err => {
    console.error(`Error connecting to Mongo ${err}`);
  });

const loadPageTranslationAxios = async () => {
  try {
    const response = await axios.get(
      "http://api.alquran.cloud/v1/page/1/en.hilali"
    );
    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
};

loadPageTranslationAxios();
