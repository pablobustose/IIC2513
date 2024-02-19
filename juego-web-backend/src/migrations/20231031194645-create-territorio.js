/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Territorios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_jugador: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Jugadors', key: 'id' },
      },
      nombre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      n_guerrero_principiante: {
        type: Sequelize.INTEGER,
      },
      n_guerrero_intermedio: {
        type: Sequelize.INTEGER,
      },
      n_guerrero_avanzado: {
        type: Sequelize.INTEGER,
      },
      centro_x: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      centro_y: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      neighbours: {
        allowNull: false,
        type: Sequelize.ARRAY(Sequelize.STRING),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Territorios');
  },
};
