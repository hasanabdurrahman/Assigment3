'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', [{
      username: 'Hasan',
      email: 'hasan123@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
