'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Photos', [{
      title: 'Foto Pertama Milik UserId 1',
      caption: 'Ini foto pertama milik UserId 1',
      image_url: 'https://images.wallpaperscraft.com/image/single/hills_slope_wires_1070677_1280x720.jpg',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Foto Kedua Milik UserId 1',
      caption: 'Ini foto kedua milik UserId 1',
      image_url: 'https://images.wallpaperscraft.com/image/single/sunset_sun_hills_1062637_1280x720.jpg',      
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: 'Foto Ketiga Milik UserId 1',
      caption: 'Ini foto ketiga milik UserId 1',
      image_url: 'https://images.wallpaperscraft.com/image/single/trees_mountains_fog_1040148_1280x720.jpg', 
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {});
  
  },

  down: async (queryInterface, Sequelize) => {
   
  }
};
