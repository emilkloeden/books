const User = `
  type User {
    givenName: String
    surname: String
    email: String!
    password: String!
  }

  input InputLoginUser {
    email: String!
    password: String!
  }
`;

module.exports = User;
