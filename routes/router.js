// const express = require("express");
// const router = express.Router();
// const axios = require("axios");

// const loadPageTranslationAxios = async () => {
//   let pageNumber = 5;
//   try {
//     const response = await axios.get(
//       `http://api.alquran.cloud/v1/page/${pageNumber}/en.hilali`
//     );
//     const ayahsArr = response.data.data.ayahs;
//     for (const ayah of ayahsArr) {
//       return { number: ayah.number, text: ayah.text };
//     }
//   } catch (error) {
//     console.error(error.message);
//   }
// };

/* GET home page */
// router.get("/", async (req, res, next) => {
//   res.render("index");
// });
