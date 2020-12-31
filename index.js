// SETUP
require("dotenv").config();
require("./utils/database");

const cors = require("cors");

const express = require("express");

// APOLLO-SERVER
const { ApolloServer } = require("apollo-server-express");

// IMPORT SCHEMA
const executableSchema = require("./src/schema");

// AUTHORIZATION
const authorization = require("./utils/authorization");

// SERVER
const server = new ApolloServer({
  schema: executableSchema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    return authorization.verify(auth);
  },
});

const app = express();
app.use(cors());

// APPLY MIDDLEWARE
app.use(express.static("build"));
server.applyMiddleware({ app, path: "/api" });

app.listen({ port: process.env.PORT || 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
