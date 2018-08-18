const mock = require("../mock-data");
const { addBook, createUser, storeUpload } = require("../utils");
const User = require("../db/models/user");
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
    me: (_, args, { user, db }) => {
      if (!user) {
        console.log(user);
        throw new Error("Unauthorized attempt. Sign in or register.");
      }
      // return await db.User.findById(user.id)
    },
    user: async (_, { id }, { db }) => {
      return await db.User.findById(id);
    }
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
    addBook: async (_, { filename, title, authors }) => {
      await addBook({ filename, title, authors });
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
      console.log(plainUser);
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
      console.log(userMatch);
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
