const axios = require('axios');
const { Pokemon, Type } = require('../db')
const { Sequelize } = require('sequelize');
// const URL_API_POKEMON = 'https://pokeapi.co/api/v2/pokemon?limit=10';
// const URL_API_POKEMON_NAME_OR_ID = 'https://pokeapi.co/api/v2/pokemon/';
// const URL_API_POKEMON_TYPE = 'https://pokeapi.co/api/v2/type';

async function getPokemonApiById(id) {
    try{
        const searchPokemonsApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        if (searchPokemonsApi) {
            let p = searchPokemonsApi;
           
            return {
                id: p.data.id,
                name: p.data.name,
                image: p.data.sprites.other.dream_world.front_default,  // url imagen
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense: p.data.stats[2].base_stat,
                speed: p.data.stats[3].base_stat,
                height: p.data.height,
                weight: p.data.weight,   
                types: p.data.types.map((t) => { return {name: t.type.name}})
            };  // return
        }else {
            return null;
        }
    } catch(error){
        return null;
    }

}


async function getPokemonDbById(id) {
    //console.log(id)
  
//     try{
//         const searchPokemon = await pokemon.findOne({
//             where: {
//                 id: id
//             },
//             include:{
//                 attributes: ["name"],
//                 model: Element,
//             }
//         });

//         return searchPokemon;
//     } catch(error){
//         return null;
//     }
// }
try{
    // const searchPokemons = await axios.get(Pokemon);

    // if (searchPokemons) {
       
    //     let p = searchPokemons;}



//const db = await Pokemon.findOne (id, { include: Element });
const searchPokemon = await Pokemon.findOne({where: { id },include: Type  });
            let p= searchPokemon;
           //console.log(p)
          // console.log(p.types)
        //    console.log(p.types[0].name)
        //    const gg = p.types.map((t) =>   t.name)
        //    console.log(gg)
           //return p;
           console.log(p.Likes)
            return {
                id: p.id,
                name: p.name,
                image: p.img,  // url imagen
                hp: p.hp,
                attack: p.attack,
                defense: p.defense,
                speed: p.speed,
                height: p.height,
                weight: p.weight,
                types: p.types.map((t) => { return {name: t.name}})
            };
                //types: p.types.map((t) => { return {name: t.type.name}})
               // types: p.types
                //types:{
                //     //    model: Element.name,
                //     //  attributes: ["name"],
                //     //model:Element,
                //     //attributes: gg.Element,
                //    // Elements: gg.Element.map((t) => { return {name: t.Element.name}})
                //              }
              // return
// console.log(p)
// console.log(searchPokemons)
// const pokemonDb = {
//   id: db.idPoke,
//   name: db.name,
//   type: db.tipos.map((t) => t.name),
//   img: "https://media.giphy.com/media/DRfu7BT8ZK1uo/giphy.gif",
//   vida: db.vida,
//   fuerza: db.fuerza,
//   defensa: db.defensa,
//   velocidad: db.velocidad,
//   height: db.altura,
//   weight: db.peso,
// };
// console.log(pokemonDb)
// return pokemonDb;
} catch (error) {
    //return error;
    return res.status(404).send(error);
  }
};


module.exports = { getPokemonApiById, getPokemonDbById }