'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nickname: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique: true,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
        }
      },
      password: {
        allowNull:false,
        type: Sequelize.STRING,
      },
      rating: {
        allowNull:false,
        defaultValue: 0,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Players');
  }
};
