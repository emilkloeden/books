const mock = require("../mock-data");
const { storeUpload } = require("../utils");

module.exports = {
  Query: {
    page: (_, { number }) => {
      console.log(number);
      return mock[number - 1];
    }
  },
  Mutation: {
    uploadFile: async (_, { file }) => {
      const { stream, filename } = await file;
      await storeUpload({ stream, filename });
      return true;
    }
  }
};
