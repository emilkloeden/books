"use strict";

module.exports = (sequelize, DataTypes) => {
  var Proof = sequelize.define(
    "Proof",
    {
      proofedText: DataTypes.TEXT,
      proofStatus: DataTypes.STRING
    },
    {}
  );
  Proof.associate = function(models) {
    Proof.belongsTo(models.Page);
    Proof.belongsTo(models.ProofContext);
    Proof.belongsTo(models.User);
  };
  return Proof;
};
