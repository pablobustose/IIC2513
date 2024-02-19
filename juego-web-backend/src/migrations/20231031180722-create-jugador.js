/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Jugadors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_usuario: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Usuarios', key: 'id' },
      },
      id_partida: {
        type: Sequelize.INTEGER,
        references: { model: 'Partidas', key: 'id' },
      },
      nombre_facultad: {
        type: Sequelize.STRING,
      },
      color: {
        type: Sequelize.STRING,
      },
      rol: {
        type: Sequelize.INTEGER,
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
      agregado: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('Jugadors');
  },
};
