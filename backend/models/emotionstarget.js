const Sequelize = require("sequelize");
module.exports = class Emotionstarget extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        satisfaction: {
          //만족여부
          type: Sequelize.STRING(1),
          allowNull: false,
        },
        target: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Emotionstarget",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Emotionstarget.belongsTo(db.Trip);
    db.Emotionstarget.belongsTo(db.Photo);
  }
};
