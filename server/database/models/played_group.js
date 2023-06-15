'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Played_group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Player }) {
      // define association here
      this.belongsTo(Player, { foreignKey: 'player_id'});
    }
  }
  Played_group.init({
    player_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    group: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Played_group',
  });
  return Played_group;
};
