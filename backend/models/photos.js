const Sequelize = require("sequelize");
module.exports = class Photos extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        photo: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        category: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        favorite: {
          type: Sequelize.TINYINT,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Photo",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Photo.hasMany(db.Post);
    db.Photo.belongsTo(db.Trip);
  }
};
