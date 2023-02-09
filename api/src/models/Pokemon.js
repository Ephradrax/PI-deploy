const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Pokemon", {
    id: {
      type: DataTypes.UUID,//UUID es para que genere un número random con letras/números y único, habilitado en sql
      defaultValue: DataTypes.UUIDV4,// ni idea
      allowNull: false,//para hacer que sea obligatorio
      primaryKey: true //una primaryKey no puede repetirse y se busca para busquedas
    },
    name: {
      type: DataTypes.STRING,//solo permite strings como unico tipo de datos
      allowNull: false, //para hacer que sea obligatorio
      unique: true,
    },
      //de life a weigth, son opcionales y todos de tipo entero
    hp: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
    attack: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
    defense: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
    speed: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
    height: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
    weight: {
      type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      allowNull: true, //para hacer que no sea obligatorio
    },
      img: {
        type: DataTypes.TEXT,//	se supone que puede guardar una string de hasta 65,535 bytes, por ejemplo el LINK A UNA IMAGEN
        allowNull: true, //para hacer que no sea obligatorio
      },
      createInDb: {
        type: DataTypes.BOOLEAN,//solo permite booleanos(true or false) como unico tipo de datos
        allowNull: false,//para hacer que sea obligatorio
        defaultValue: 'true',//Al estar true por default, al crear un pokemon de el atributp createInDb, que puedo usar para filtrarlos
      },
      // Likes: {
      //   type: DataTypes.INTEGER,//solo permite numeros como unico tipo de datos
      //   allowNull: true, //para hacer que no sea obligatorio
      // },
    },
    {
      timestamps: false,//muestra la hora de creacion(creo)
      createdAt: false,//muestra la fecha de creacion
      updatedAt: false,//muestra la ultima fecha de actualizacion
    }
  )
};