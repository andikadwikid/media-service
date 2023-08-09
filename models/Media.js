"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Media extends Model {
    static associate(models) {
      // define association here
    }
  }
  Media.init(
    {
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Media",
    }
  );
  return Media;
};
