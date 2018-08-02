const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    username: String
  }
  type Image {
    src: String
  }
  type Proof {
    id: Int
    who: User
    text: String
  }
  type PageText {
    ocr: String
    proofs: [Proof]
  }
  type Page {
    image: Image
    text: PageText
  }
  type Query {
    page(number: Int!): Page
  }

  type Mutation {
    uploadFile(file: Upload!): Boolean
    addBook(filename: String, title: String!, authors: String!): Boolean
  }
`;
