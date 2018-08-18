const User = require("./User");
const Mutation = `
  type Mutation {
    uploadFile(file: Upload!): Boolean
    addBook(filename: String, title: String!, authors: String!): Boolean
    createUser(givenName: String, surname: String, email: String!, password: String!): Boolean
    logUserIn(input: InputLoginUser!): String
  }
`;

module.exports = Mutation;
