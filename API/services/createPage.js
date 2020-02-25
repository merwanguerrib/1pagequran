const getUrlPage = require("./getUrlPage");
const loadPageTranslationAxios = require("./loadPageTranslationAxios");

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

module.exports = createPage;
