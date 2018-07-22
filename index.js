const { ApolloServer, gql } = require("apollo-server");
const mock = require("./mock-data");

const typeDefs = gql`
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
`;

const resolvers = {
  Query: {
    page: (_, { number }) => {
      console.log(number);
      return mock[number - 1];
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
