import getUrlPage from "./getUrlPage";
import loadPageTranslationAxios from "./loadPageTranslationAxios";

// Create the page = img and translation

const createPage = async recipient => {
  const pageObjectToRender = {
    srcUrl: "",
    verses: []
  };
  await getUrlPage(recipient)
    .then(srcUrl => {
      pageObjectToRender.srcUrl = srcUrl;
    })
    .catch(err => {
      console.error(err);
    });

  await loadPageTranslationAxios(recipient)
    .then(verses => {
      pageObjectToRender.verses = verses;
    })
    .catch(error => {
      console.error(error);
    });
  return pageObjectToRender;
};

export default createPage;
