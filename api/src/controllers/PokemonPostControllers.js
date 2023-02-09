const axios = require('axios');
const { Type, Pokemon } = require('../db')



      
const PostPokemons = async (name, hp , attack, defense, speed, height, weight, image, types ) => {
    try { 
     console.log(name)
      const findPokemon = await Pokemon.findOne({ where: { name: name.toLowerCase() }, });
      if(findPokemon){
        return('Pokemon already exists');
           }else{
        let newPokemon = await Pokemon.create({
        name: name.toLowerCase(),
        img: image,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
       });
        let pokemonType = await Type.findAll({
           where: {
           name: types
         },
            });
 // await newPokemon.setTypes(pokemonType);
  await newPokemon.addTypes(pokemonType);
  return (newPokemon)
};
    } catch (error) {
      return('error de creación');
    }
  };



module.exports = { PostPokemons }