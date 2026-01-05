const Sequelize = require("sequelize");
module.exports = class PhotoCategoryMap extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        confidence_score: {
          type: Sequelize.FLOAT(2, 1),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "PhotoCategoryMap",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.PhotoCategoryMap.hasMany(db.Photos);
    db.PhotoCategoryMap.hasMany(db.Category);
  }
};
