const User = require("./User");
const ProofContext = require("./ProofContext");

const Proof = `
  type Proof {
    id: ID
    user: User
    text: String
    context: ProofContext
  }
`;

module.exports = Proof;
