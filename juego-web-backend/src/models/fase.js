const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Fase extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.Flujo, {
        foreignKey: 'id',
      });
    }
  }
  Fase.init({
    nombre: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Fase',
  });
  return Fase;
};
