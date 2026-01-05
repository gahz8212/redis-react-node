const Sequelize = require("sequelize");
module.exports = class Destinations extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        no: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        name: {
          type: Sequelize.STRING(200),
          allowNull: false,
        },
        local:{
          type:Sequelize.STRING(400),
          allowNull:false
        },
        theme:{
          type:Sequelize.STRING(2),
          allowNull:false
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Destinations",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Emotion_target.belongsTo(db.Trip);
    db.Emotion_target.belongsTo(db.Photo);
  }
};
