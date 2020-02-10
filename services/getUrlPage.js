import Page from "../models/Page";
import recipient from "./getRecipients";
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

export default getUrlPage;
