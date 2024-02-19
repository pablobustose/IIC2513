const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Jugador, {
        foreignKey: 'id',
      });
    }
  }
  Usuario.init({
    nombre_usuario: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          msg: 'El nombre de usuario solo puede contener letras y numeros',
        },
      },
    },
    contrasena: DataTypes.STRING,
    mail: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'El correo debe tener su formato adecuado',
        },
      },
    },
  }, {
    sequelize,
    modelName: 'Usuario',
  });
  return Usuario;
};
