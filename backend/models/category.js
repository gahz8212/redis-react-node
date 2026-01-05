const Sequelize = require("sequelize");
module.exports = class Categories extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        category: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
       
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Categories",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Category.belongsTo(db.Photo);
    db.Category.belongsTo(db.PhotoCategoryMap);

  }
};
