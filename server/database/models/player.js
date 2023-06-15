'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Played_group }) {
      // define association here
      this.hasMany(Played_group, {foreignKey: 'player_id'});
    }
  }
  Player.init({
    nickname: {
      allowNull:false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull:false,
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    rating: {
      allowNull: false,
      defaultValue: 0,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};
