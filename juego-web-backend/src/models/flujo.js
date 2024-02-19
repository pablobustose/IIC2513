const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Flujo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
      this.belongsTo(models.Jugador, {
        foreignKey: 'id_jugador_ganador',
      });
      this.belongsTo(models.Jugador, {
        foreignKey: 'id_jugador_ganador',
      });
      this.belongsTo(models.Fase, {
        foreignKey: 'id_fase',
      });
      this.belongsTo(models.Jugador, {
        foreignKey: 'id_defensor',
      });
    }
  }
  Flujo.init({
    id_partida: DataTypes.INTEGER,
    id_jugador_ganador: DataTypes.INTEGER,
    id_jugador_turno: DataTypes.INTEGER,
    id_fase: DataTypes.INTEGER,
    ronda: DataTypes.INTEGER,
    ataques_ronda: DataTypes.INTEGER,
    id_defensor: DataTypes.INTEGER,
    dados_atacante: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
    dados_defensor: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
  }, {
    sequelize,
    modelName: 'Flujo',
  });
  return Flujo;
};
