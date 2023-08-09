module.exports = (sequelize, DataTypes) => {
  const Media = sequelize.define(
    "Media",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
    },
    {
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      created_at: {
        type: "TIMESTAMP",
        defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    },
    {
      updated_at: {
        type: "TIMESTAMP",
        defaultValue: DataTypes.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        allowNull: false,
      },
    },
    {
      tableName: "media",
      underscored: true,
    }
  );

  Media.associate = function (models) {
    // associations can be defined here
  };

  return Media;
};
