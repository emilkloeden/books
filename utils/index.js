const fs = require("fs");
const path = require("path");
const User = require("../db/models/user");

module.exports = {
  storeUpload: ({ stream, filename }) => {
    return new Promise((resolve, reject) =>
      stream
        .pipe(
          fs.createWriteStream(
            path.join(__dirname, "..", "book-uploads", filename)
          )
        )
        .on("finish", resolve)
        .on("error", reject)
    );
  },

  addBook: ({ filename, title, authors }) => {
    return new Promise((resolve, reject) => {
      console.log({ filename, title, authors });
      resolve();
    });
  },
  createUser: ({ givenName, surname, email, password }) => {
    return User.create({ givenName, surname, email, password });
  }
};
