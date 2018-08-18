const Proof = require("./Proof");

const PageText = `
  type PageText {
    ocr: String
    proofs: [Proof]
  }
`;
module.exports = PageText;
