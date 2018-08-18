const User = require("./User");

const Proof = `
  type Proof {
    id: Int
    who: User
    text: String
  }
`;

module.exports = Proof;
