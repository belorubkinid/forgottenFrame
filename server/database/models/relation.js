'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Relation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Movie }) {
      // define association here
      this.belongsTo(Movie, { foreignKey: 'rel1_movie_id' });
      this.belongsTo(Movie, { foreignKey: 'rel2_movie_id' });
    }
  }
  Relation.init({
    rel1_movie_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    rel2_movie_id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Relation',
  });
  return Relation;
};
