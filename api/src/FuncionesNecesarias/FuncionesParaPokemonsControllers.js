/******** Función para extraer los types del pokemon *********/
const axios = require('axios');
const { Pokemon, Type } = require('../db');


// const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=40';
// const URL_API_POKEMON_NAME_OR_ID = 'https://pokeapi.co/api/v2/pokemon/';
// const URL_API_POKEMON_TYPE = 'https://pokeapi.co/api/v2/type';


function getNamesByTypes(pokemon) {
    console.log(pokemon.types)
      pokemon = pokemon.types.map((e) => e.name);
      return pokemon;
    }
    
    const getPokemonByNameOrId = async (id, name) => {
        if (id && !name) {
          try {
            const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const foundPokemon = apiPokemon.data;
            const pokemon = {
              id: foundPokemon.id,
              name: foundPokemon.name,
              img: foundPokemon.sprites.other['official-artwork'].front_default,
              hp: foundPokemon.stats[0].base_stat,
              attack: foundPokemon.stats[1].base_stat,
              defense: foundPokemon.stats[2].base_stat,
              speed: foundPokemon.stats[5].base_stat,
              height: foundPokemon.height,
              weight: foundPokemon.weight,
              types: foundPokemon.types.map((t) => t.type.name),
            };
            return pokemon;
          } catch (error) {
            console.log(error);
          }
        }
        if (!id && name) {
          try {
            const apiPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            const foundPokemon = apiPokemon.data;
            const pokemon = {
              id: foundPokemon.id,
              name: foundPokemon.name,
              img: foundPokemon.sprites.other['official-artwork'].front_default,
              hp: foundPokemon.stats[0].base_stat,
              attack: foundPokemon.stats[1].base_stat,
              defense: foundPokemon.stats[2].base_stat,
              speed: foundPokemon.stats[5].base_stat,
              height: foundPokemon.height,
              weight: foundPokemon.weight,
              types: foundPokemon.types.map((t) => t.type.name),
            };
            return pokemon;
          } catch (error) {
            console.log(error);
          }
        }
      };

      const getApiPokemons = async () => {
        // Opción 1----->
        try {
          const apiPokemons = [];
          const pokemonRequest = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40');
          const urlPokemonSubrequest = pokemonRequest.data.results.map((pokemon) => pokemon.url);
           //console.log(urlPokemonSubrequest);
          await axios.all(urlPokemonSubrequest.map((urlPokemonSubrequest) => axios.get(urlPokemonSubrequest))).then(
            (foundPokemons) => {
              //console.log(foundPokemons)
              foundPokemons.map((foundPokemon) => apiPokemons.push({
                id: foundPokemon.data.id,
                name: foundPokemon.data.name,
                img: foundPokemon.data.sprites.other['official-artwork'].front_default,
                hp: foundPokemon.data.stats[0].base_stat,
                attack: foundPokemon.data.stats[1].base_stat,
                defense: foundPokemon.data.stats[2].base_stat,
                speed: foundPokemon.data.stats[5].base_stat,
                height: foundPokemon.data.height,
                weight: foundPokemon.data.weight,
                createdInDb: false,
                types: foundPokemon.data.types.map((t) => {return { name: t.type.name}}),
              }));
            },
          );
          //console.log(apiPokemons)
          return apiPokemons;
        } catch (error) {
          console.log(error);
        }}
      //}
    
    
       
      const getPokemonsDb = async () => 
      {
          try{
              const arrayPokemonsDb = await Pokemon.findAll({
                  include:{
                      attributes: ["name"],
                      model: Type,
                      through: {
                      attributes: [],
                      },
                  }
              });
              return arrayPokemonsDb;
          } catch(error){
              return error;
          }
          // ------------------------------- end - carga de poke DB
      }
    
      const getAllPokemons = async () => {
        try {
          const apiPokemons = await getApiPokemons();
          const dbPokemons = await getPokemonsDb();
          return [...apiPokemons, ...dbPokemons];
        } catch (error) {
          console.log(error);
        }
      };

    module.exports = { getNamesByTypes, getPokemonByNameOrId, getAllPokemons };
    
