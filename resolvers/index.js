const { createBook, storeUpload } = require("../utils");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const SEARCH_RESULT_LIMIT = 20;

const book = async (_, { id }, { db }) => {
  return await db.Book.findById(id);
};

activeProofContext: async ({ id: bookId }, _, { db, user }) => {
  const userId = user.id;
  console.log({ userId });
  const activeProof = await db.ProofContext.findOne({
    where: { bookId, userId }
  });
  if (!activeProof) {
    await db.ProofContext.findOne();
  }
};

module.exports = {
  Query: {
    me: async (_, __, { user, db }) => {
      if (!user) {
        throw new Error("Unauthorized attempt. Sign in or register.");
      }

      return await db.User.findById(user.id);
    },
    user: async (_, { id }, { db }) => {
      return await db.User.findById(id);
    },
    books: async (_, __, { db }) => {
      // const book = await db.Book.findAll({ limit: SEARCH_RESULT_LIMIT });
      // uploadedBy: async ({ UserId }, _, { db }) => {
      //   return await db.User.findById(UserId);
      // };
      // return book;

      return await db.Book.findAll({ limit: SEARCH_RESULT_LIMIT });
    },
    book

    // nextPage: async({ id: proofContextId }, _, {db, user}) => {
    //   const book = await db.Book.findOne({where: {}})
    // }
  },
  Mutation: {
    uploadFile: async (_, { file }, { user }) => {
      const { email } = user;
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    },
    addBook: async (_, { filename, title, authors }, { user, db }) => {
      try {
        await createBook({ filename, title, authors, user, db });
        return true;
      } catch (e) {
        console.error(`Error in addBook: ${e}`);
        return false;
      }

      return true;
    },
    createUser: async (_, { givenName, surname, email, password }, { db }) => {
      const encryptedPassword = bcrypt.hashSync(password, 10);
      const existingUser = await db.User.findOne({ where: { email } });
      if (existingUser) {
        throw Error("An account has been registered to that email address");
      }
      const user = await db.User.create({
        givenName,
        surname,
        email,
        password: encryptedPassword
      });
      const plainUser = await user.get({ plain: true });
      return jsonwebtoken.sign(
        {
          id: plainUser.id,
          email: plainUser.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
    },
    logUserIn: async (_, { input }, { db }) => {
      const { email, password } = input;
      const userMatch = await db.User.findOne({ where: { email } });
      if (!userMatch) {
        throw Error("User not found or username and password don't match");
      }
      const passwordMatch = bcrypt.compareSync(password, userMatch.password);
      if (!passwordMatch) {
        throw Error("User not found or username and password don't match");
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
