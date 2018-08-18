"use strict";

module.exports = {
  up: async queryInterface => {
    return await queryInterface.bulkInsert(
      "Users",
      [
        {
          givenName: "John",
          surname: "Doe",
          email: "demo@demo.com",
          password: "1234"
        }
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
