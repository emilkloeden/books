const Book = require("./Book");
const Image = require("./Image");
const Page = require("./Page");
const PageText = require("./PageText");
const Proof = require("./Proof");
const ProofContext = require("./ProofContext");
const Query = require("./Query");
const User = require("./User");
const Mutation = require("./Mutation");

const { gql } = require("apollo-server-express");

module.exports = gql`
  ${Query}
  ${Book}
  ${Page}
  ${User}
  ${PageText}
  ${Proof}
  ${ProofContext}
  ${Image}
  ${Mutation}
`;
