"use strict";

module.exports = (sequelize, DataTypes) => {
  var ProofContext = sequelize.define(
    "ProofContext",
    {
      proofedText: DataTypes.TEXT,
      proofStatus: DataTypes.STRING
    },
    {}
  );
  ProofContext.associate = function(models) {
    ProofContext.hasMany(models.Proof);
    ProofContext.belongsTo(models.Book);
    ProofContext.belongsToMany(models.User, { through: "UserProofContext" });
  };
  return ProofContext;
};
