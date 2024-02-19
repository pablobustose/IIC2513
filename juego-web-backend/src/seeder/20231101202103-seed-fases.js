/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Fases', [
      {
        nombre: 'Reforzamiento', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        nombre: 'Ataque', createdAt: new Date(), updatedAt: new Date(),
      },
      {
        nombre: 'Desplazamiento', createdAt: new Date(), updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
