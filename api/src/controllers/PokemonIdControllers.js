const { getPokemonApiById, getPokemonDbById } = require('../FuncionesNecesarias/FuncionesParaIdControllers');
    const GetPokeId = async (id) => {
    try {
      let pokemonDB = await getPokemonDbById(id)
      return(pokemonDB);
    } catch (error) {
      try {
        console.log(id)
          let pokemonSearch = null;
          pokemonSearch = await getPokemonApiById(id);
          return(pokemonSearch);
      } catch (error) {
        return (error); //si el id no se encontró en ningún lado
      }}};

module.exports = { GetPokeId }