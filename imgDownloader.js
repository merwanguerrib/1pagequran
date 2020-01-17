const download = require("image-downloader");

const digitFormatter = digit => {
  if (digit <= 9) {
    return `00${digit}`;
  } else if (digit >= 10 && digit <= 99) {
    return `0${digit}`;
  } else return `${digit}`;
};

urlFormatter = () => {
  let imageUrl = undefined;
  for (let i = 1; i <= 12; i++) {
    imageUrl = `https://www.searchtruth.org/quran/images1/${digitFormatter(
      i
    )}.jpg`;
  }
  return imageUrl;
};
urlFormatter();

// const options = {
//   url: imageUrl,
//   dest: "./img"
// };

// async function downloadIMG() {
//   try {
//     const { filename, image } = await download.image(options);
//     console.log(filename); // => /path/to/dest/image.jpg
//   } catch (e) {
//     console.error(e);
//   }
// }

// downloadIMG();
