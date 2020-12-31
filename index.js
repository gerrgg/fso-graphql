require("dotenv").config();

require("./utils/database");

// graphql and ApolloServer
const { ApolloServer } = require("apollo-server");

// Schema
const executableSchema = require("./src/schema");

const authorization = require("./utils/authorization");

const server = new ApolloServer({
  schema: executableSchema,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    return authorization.verify(auth);
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
