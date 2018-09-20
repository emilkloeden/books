"use strict";

module.exports = (sequelize, DataTypes) => {
  var Page = sequelize.define(
    "Page",
    {
      pageNumber: DataTypes.INTEGER,
      textLocation: DataTypes.STRING,
      imageLocation: DataTypes.STRING
    },
    {}
  );
  Page.associate = function(models) {
    Page.belongsTo(models.Book);
    Page.hasMany(models.Proof);
  };
  return Page;
};
