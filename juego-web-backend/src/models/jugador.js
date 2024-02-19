const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Jugador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
      });
      this.belongsTo(models.Partida, {
        foreignKey: 'id_partida',
      });
      this.hasMany(models.Carta, {
        foreignKey: 'id',
      });
      this.hasMany(models.Territorio, {
        foreignKey: 'id',
      });
    }
  }
  Jugador.init({
    id_usuario: DataTypes.INTEGER,
    id_partida: DataTypes.INTEGER,
    nombre_facultad: DataTypes.STRING,
    color: DataTypes.STRING,
    rol: DataTypes.INTEGER,
    n_guerrero_principiante: DataTypes.INTEGER,
    n_guerrero_intermedio: DataTypes.INTEGER,
    n_guerrero_avanzado: DataTypes.INTEGER,
    agregado: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Jugador',
  });
  return Jugador;
};
