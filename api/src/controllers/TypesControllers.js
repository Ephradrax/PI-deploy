const axios = require('axios');
const { Type } = require('../db')
const URL_API_POKEMON_TYPE = 'https://pokeapi.co/api/v2/type';

const getApiType = async () => {
  try {
     const typeApi = await axios.get(URL_API_POKEMON_TYPE);
     const types = typeApi.data.results;
    
    types.forEach((type) => {
      Type.findOrCreate({
        where: { name: type.name },
      });
    });
   
    
      const DbTypes = await Type.findAll();
      console.log(DbTypes)
     return DbTypes;
    
  }catch(error){
    console.log(error);
    res.status(404).send('error')
};
  };

module.exports = { getApiType }