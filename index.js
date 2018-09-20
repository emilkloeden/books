require("dotenv").config();
const { ApolloServer } = require("apollo-server-express");
const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("express-jwt");
const amqp = require("amqplib/callback_api");

const db = require("./db/models");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();

const getContext = ({ req }) => ({ db, user: req.user });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: getContext
});

const auth = jwt({
  secret: process.env.JWT_SECRET,
  credentialsRequired: false
});

app.use(bodyParser.json());
app.use(auth, function(err, req, res, next) {
  // hack due to https://github.com/auth0/express-jwt/issues/194
  if (err.code === "invalid_token") {
    return next();
  }
  return next(err);
});

server.applyMiddleware({ app });

const domain = "http://localhost";
const port = 4000;

const launchApp = () => {
  // console.log("hi");
  app.listen({ port }, () => {
    console.log(`🚀  Server ready at ${domain}:${port}${server.graphqlPath}`);
  });
};

const launchMessaging = () => {};

db.sequelize
  // .authenticate()
  .sync({ force: true, logging: console.log })
  // .then(console.log("hiho"))
  // .then(launchMessaging)
  .then(launchApp)
  .catch(err => console.error(err));
