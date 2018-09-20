const User = require("./User");
const Book = require("./Book");

const ProofContext = `
  type ProofContext {
    id: ID
    assignedUsers: [User]
    book: Book
    text: String
  }
`;

module.exports = ProofContext;
