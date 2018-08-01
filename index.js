const { ApolloServer } = require("apollo-server-express");
const { apolloUploadExpress } = require("apollo-upload-server");
const bodyParser = require("body-parser");
const express = require("express");

const typeDefs = require("./types");
const resolvers = require("./resolvers");

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(bodyParser.json(), apolloUploadExpress);

const domain = "http://localhost";
const port = 4000;

app.listen({ port }, () => {
  console.log(`🚀  Server ready at ${domain}:${port}${server.graphqlPath}`);
});
