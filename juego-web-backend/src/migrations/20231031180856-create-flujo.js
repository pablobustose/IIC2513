/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Flujos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_partida: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Partidas', key: 'id' },
      },
      id_jugador_ganador: {
        type: Sequelize.INTEGER,
        references: { model: 'Jugadors', key: 'id' },
      },
      id_jugador_turno: {
        type: Sequelize.INTEGER,
        references: { model: 'Jugadors', key: 'id' },
      },
      id_fase: {
        type: Sequelize.INTEGER,
        references: { model: 'Fases', key: 'id' },
      },
      ronda: {
        type: Sequelize.INTEGER,
      },
      ataques_ronda: {
        type: Sequelize.INTEGER,
      },
      id_defensor: {
        type: Sequelize.INTEGER,
        references: { model: 'Jugadors', key: 'id' },
      },
      dados_atacante: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
      },
      dados_defensor: {
        type: Sequelize.ARRAY(Sequelize.ARRAY(Sequelize.INTEGER)),
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
    await queryInterface.dropTable('Flujos');
  },
};
