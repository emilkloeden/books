const mock = require("../mock-data");
const { addBook, storeUpload } = require("../utils");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

module.exports = {
  Query: {
    page: (_, { number }) => {
      console.log(number);
      return mock[number - 1];
    },
    me: async (_, __, { user, db }) => {
      if (!user) {
        throw new Error("Unauthorized attempt. Sign in or register.");
      }

      return await db.User.findById(user.id);
    },
    user: async (_, { id }, { db }) => {
      return await db.User.findById(id);
    }
  },
  Mutation: {
    uploadFile: async (_, { file }, { user }) => {
      const { email } = user;
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
    addBook: async (_, { filename, title, authors }, { user }) => {
      const { email } = user;
      await addBook({ filename, title, authors, email });
      return true;
    },
    createUser: async (_, { givenName, surname, email, password }, { db }) => {
      const encryptedPassword = bcrypt.hashSync(password, 10);
      const user = await db.User.create({
        givenName,
        surname,
        email,
        password: encryptedPassword
      });
      const plainUser = await user.get({ plain: true });
      return true;
    },
    logUserIn: async (_, { input }, { db }) => {
      const { email, password } = input;
      const userMatch = await db.User.findOne({ where: { email } });
      if (!userMatch) {
        throw Error("User not found or username and password don't match");
      }
      const passwordMatch = bcrypt.compareSync(password, userMatch.password);
      if (!passwordMatch) {
        throw Error("User not found or username and password don't match2");
      }
      return jsonwebtoken.sign(
        {
          id: userMatch.id,
          email: userMatch.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    }
  }
};
