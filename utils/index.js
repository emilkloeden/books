const fs = require("fs");
const path = require("path");

module.exports = {
  storeUpload: ({ stream, filename }) =>
    new Promise((resolve, reject) =>
      stream
        .pipe(
          fs.createWriteStream(path.join(__dirname, "book-uploads", filename))
        )
        .on("finish", resolve)
        .on("error", reject)
    )
};
