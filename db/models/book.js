"use strict";

module.exports = (sequelize, DataTypes) => {
  var Book = sequelize.define(
    "Book",
    {
      title: DataTypes.STRING,
      authors: DataTypes.STRING,
      pageCount: DataTypes.INTEGER,
      slug: DataTypes.STRING,
      filename: DataTypes.STRING
    },
    {}
  );
  Book.associate = function(models) {
    Book.belongsTo(models.User);
    Book.hasMany(models.Page);
    Book.hasMany(models.ProofContext);
  };
  return Book;
};
