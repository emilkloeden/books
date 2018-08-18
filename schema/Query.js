const Page = require("./Page");
const User = require("./user");

const Query = `
  type Query {
    page(number: Int!): Page
    me: User
    user(id: Int!): User
  }
`;

module.exports = Query;
