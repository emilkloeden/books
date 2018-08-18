require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const { apolloUploadExpress } = require("apollo-upload-server");
const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("express-jwt");
const db = require("./db/models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    console.log(req.headers.authorization);
    return { db, user: req.user };
  }
});

server.applyMiddleware({ app });

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false,
  getToken: req => {
    console.log("This is called!");
    console.log(Object.keys(req.headers));
    const token = req.headers.authorization.split(" ")[1];
    console.log(`token=${token}`);
    return token;
  }
});

app.use(bodyParser.json(), auth, apolloUploadExpress);

app.use("/graphql", auth);

const domain = "http://localhost";
const port = 4000;

db.sequelize.authenticate().then(() => {
  app.listen({ port }, () => {
    console.log(`🚀  Server ready at ${domain}:${port}${server.graphqlPath}`);
  });
});
