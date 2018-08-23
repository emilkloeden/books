const fs = require("fs");
const path = require("path");

const storeUpload = ({ stream, filename, email }) => {
  return new Promise((resolve, reject) => {
    const resolvedDirPath = path.join(__dirname, "..", "book-uploads", email);

    return stream
      .pipe(
        fs.createWriteStream(
          path.join(__dirname, "..", "book-uploads", email, filename)
        )
      )
      .on("finish", resolve)
      .on("error", reject);
  });
};

const addBook = ({ filename, title, authors, email }) => {
  //TODO
  return new Promise((resolve, reject) => {
    console.log({ filename, title, authors, email });
    resolve();
  });
};
const dirExists = dirPath => {
  return fs.statSync(dirPath).isDirectory();
};

module.exports = { storeUpload, addBook, dirExists };
