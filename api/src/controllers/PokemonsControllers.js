const { Pokemon, Type }= require('.././db');

const axios = require('axios');

// const { getAllPokemons } = require('../routes/modules/GetPokemons')
// const { getNamesByTypes } = require('../routes/modules/getNamesByTypes');
// const { getPokemonByNameOrId }= require('../routes/modules/GetPokemonByName')
const { getAllPokemons , getNamesByTypes , getPokemonByNameOrId }= require('../FuncionesNecesarias/FuncionesParaPokemonsControllers')

const GetPokes = async (id,name) => {  
  try {
    // GET /pokemons
    if (!name) {
      //obtenemos la data desde la base de datos como un array
      const arrPokemonsDb = await getAllPokemons();
      return arrPokemonsDb;
    } else {
      const nameLower = name.toLowerCase();
      let pokemonDB = await Pokemon.findOne({
        where: {
          name: nameLower,
        },
        include: Type,
      });
      
      if (pokemonDB) {
        pokemonDB = {
          ...pokemonDB.dataValues,
          types: getNamesByTypes(pokemonDB),
        };
        return(pokemonDB);
      } 
      const pokemonAPI = await getPokemonByNameOrId(nameLower)
      if(pokemonAPI){
      return(pokemonAPI)
    } else{return 'Ese pokemon no existe'}
    }
  } catch (error) {
    console.log(error)
    return(error);
  }
};

  module.exports = { GetPokes };