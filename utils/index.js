const fs = require("fs");
const path = require("path");
const slugify = require("slugify");
const axios = require("axios");

const storeUpload = ({ stream, filename, email }) => {
  return new Promise((resolve, reject) => {
    return stream
      .pipe(
        fs.createWriteStream(
          path.join(__dirname, "..", "book-uploads", filename)
        )
      )
      .on("finish", resolve)
      .on("error", reject);
  });
};

const createBook = async ({ filename, title, authors, user, db }) => {
  const slug = slugify(title);
  const data = {
    title,
    authors,
    userId: user.id,
    slug,
    filename
  };

  // @TODO Remove hardcoding
  const bookUploadDir = path.resolve(__dirname, "../book-uploads");
  const PDFPath = path.join(bookUploadDir, filename);
  const PNGPath = path.join(bookUploadDir, slug, "png");
  const TXTPath = path.join(bookUploadDir, slug, "txt");

  const book = await db.Book.create(data);
  const plainBook = await book.get({ plain: true });
  console.log(`plainBook: ${JSON.stringify(plainBook, null, 2)}`);
  const event = {
    type: "book:create",
    data: { ...data, PDFPath, PNGPath, TXTPath }
  };
  // Expect 200, 400 or 500 response
  const { status } = await registerEvent(event);

  return status === 200;
};

const registerEvent = async e => {
  const url =
    process.env.REACT_APP_EVENT_QUEUE_SERVICE_URL || "http://localhost:7000";

  return axios.post(url, e);
};

const dirExists = dirPath => {
  return fs.statSync(dirPath).isDirectory();
};

module.exports = { storeUpload, createBook, dirExists };
