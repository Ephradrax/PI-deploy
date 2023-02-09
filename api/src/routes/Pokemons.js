const { Router } = require('express');
const router = Router();
// IMPORTAR MODELS
const { PostPokemons }= require('../controllers/PokemonPostControllers')
const { GetPokeId } = require('../controllers/PokemonIdControllers')
const { GetPokes } = require('../controllers/PokemonsControllers')


//-------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  const post = await GetPokeId(id)
   res.send(post)
})
//Requiere la funcion getPokemonDbById(), Requiere la funcion getPokemonApiById()
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
router.get('/', async (req, res, next) => {
  const {id, name } = req.query;
const post = await GetPokes( id,name)
res.send(post)});
//requiere la funcion getAllPokemons(),  Requiere la funcion getNamesByTypes(),   Requiere la funcion getPokemonByNameOrId() 
//---------------------------------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------------------------------------------------------
  router.post('/', async (req, res, next) => {
    let { name, hp , attack, defense, speed, height, weight, image, types } = req.body; //recibo toda la info por body  
    const post = await PostPokemons(name, hp , attack, defense, speed, height, weight, image, types );
    res.send(post);
  });
  //SOLO REQUIERE DE SI MISMO
//----------------------------------------------------------------------------------------------
module.exports = router;