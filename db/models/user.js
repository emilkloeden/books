"use strict";

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    "User",
    {
      givenName: DataTypes.STRING,
      surname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    User.hasMany(models.Book);
    User.hasMany(models.Proof);
    User.belongsToMany(models.ProofContext, { through: "UserProofContext" });
  };
  return User;
};
