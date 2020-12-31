const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../models/user");

module.exports = {
  typeDef: `
  type User {
    username: String!
    favoriteGenre: String
    id: ID!
  }`,
  resolvers: {
    Query: {
      allUsers: async (root, args) => User.find({}),
    },
    Mutation: {
      editUser: async (root, args, { currentUser }) => {
        if (!currentUser) throw new AuthenticationError("Not authenticated");

        const user = await User.findById(currentUser._id);

        try {
          user.favoriteGenre = args.favoriteGenre;
          return user.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      },

      createUser: (root, args) => {
        const user = new User({ ...args });

        return user.save().catch((error) => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        });
      },
    },
  },
};
