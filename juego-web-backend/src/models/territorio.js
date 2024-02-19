const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Territorio extends Model {
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
  Territorio.init({
    id_jugador: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    n_guerrero_principiante: DataTypes.INTEGER,
    n_guerrero_intermedio: DataTypes.INTEGER,
    n_guerrero_avanzado: DataTypes.INTEGER,
    centro_x: DataTypes.INTEGER,
    centro_y: DataTypes.INTEGER,
    neighbours: DataTypes.ARRAY(DataTypes.STRING),
  }, {
    sequelize,
    modelName: 'Territorio',
  });
  return Territorio;
};
