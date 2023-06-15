'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Relation }) {
      // define association here
      this.hasOne(Relation, { foreignKey: 'rel1_movie_id' });
      this.hasOne(Relation, { foreignKey: 'rel2_movie_id' });
    }
  }
  Movie.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    group: {
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    director: {
      type: DataTypes.STRING,
    },
    actor1: {
      type: DataTypes.STRING,
    },
    actor2: {
      type: DataTypes.STRING,
    },
    genre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    frame: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
