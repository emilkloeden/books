const User = require("./User");
const Proof = require("./Proof");
const Page = require("./Page");
const ProofContext = require("./ProofContext");

const Book = `
  type Book {
      id: ID!
    title: String!
    authors: String!
    uploadedBy: User
    pageCount: Int
    slug: String!
    filename: String!
    proofs: [Proof]
    proofContexts: [ProofContext]
    activeProofContext: ProofContext
    pages: [Page]
  }
`;

module.exports = Book;
