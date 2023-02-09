const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("type", {
    name: {
      type: DataTypes.STRING,//solo permite strings como unico tipo de datos
      allowNull: false,//para hacer que sea obligatorio
      
    },
  },
  {
    timestamps: false,//muestra la hora de creacion(creo)
    createdAt: false,//muestra la fecha de creacion
    updatedAt: false,//muestra la ultima fecha de actualizacion
  })
};
