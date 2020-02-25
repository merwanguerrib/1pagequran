const Page = require("../models/Page");
const recipient = require("./getRecipients");
//Search in database for the url related to pageNumber

const getUrlPage = async recipient => {
  let imgSrc = "";
  try {
    await Page.findOne({ number: recipient.advancement }).then(dbRes => {
      imgSrc = dbRes.image;
    });
    return imgSrc;
  } catch (error) {
    console.error(`Dbres error : `, error);
  }
};

module.exports = getUrlPage;
