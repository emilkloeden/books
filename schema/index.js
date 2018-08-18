const Image = require("./Image");
const Page = require("./Page");
const PageText = require("./PageText");
const Proof = require("./Proof");
const Query = require("./Query");
const User = require("./User");
const Mutation = require("./Mutation");

const { gql } = require("apollo-server-express");

module.exports = gql`
  ${Query}
  ${Page}
  ${User}
  ${PageText}
  ${Proof}
  ${Image}
  ${Mutation}
`;
