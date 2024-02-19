const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Carta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Jugador, {
        foreignKey: 'id_jugador',
      });
    }
  }
  Carta.init({
    id_jugador: DataTypes.INTEGER,
    tipo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Carta',
  });
  return Carta;
};
