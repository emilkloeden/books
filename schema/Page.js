const Image = require("./Image");
const PageText = require("./PageText");

const Page = `
  type Page {
    image: Image
    text: PageText
  }
`;

module.exports = Page;
