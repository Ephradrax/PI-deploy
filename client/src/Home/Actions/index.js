import axios from "axios";
//import swal from "sweetalert";

export const pokeAction = {
  GET_ALL_POKEMONS: "GET_ALL_POKEMONS",
  GET_POKEMON: "GET_POKEMON",
  POST_POKEMON: "POST_POKEMON",
  GET_TYPES: "GET_TYPES",
  FILTER_POKEMONS_BY_TYPE: "FILTER_POKEMONS_BY_TYPE",
  FILTER_POKEMONS_CREATED: "FILTER_POKEMONS_CREATED",
  SORT_POKEMONS_ALPHABETICALLY: "SORT_POKEMONS_ALPHABETICALLY",
  SORT_POKEMONS_BY_ATTACK: "SORT_POKEMONS_BY_ATTACK",
  GET_DETAILS: "GET_DETAILS",
  CLEAR_DETAILS_STATE: "CLEAR_DETAILS_STATE",
  LOADER_TRUE: "LOADER_TRUE",
  LOADER_FALSE: "LOADER_FALSE",
};

//acción que permite traer a todos los pokemones del api + los de la base de datos
export function getAllPokemons() {
  return async function (dispatch) {
    try {
        let json = await axios.get('http://localhost:3001/Pokemons');
        return dispatch({
            type: pokeAction.GET_ALL_POKEMONS,
            payload: json.data
        });
    } catch (error) {
      console.error(error);
       alert("Ha ocurrido un error al traer todos los pokemones, por favor vuelve a intentar");

    }
  };
}

export function getPokemon(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios(`http://localhost:3001/pokemons?name=${name}`
      );
      return dispatch({
        type: pokeAction.GET_POKEMON,
        payload: pokemon.data,
      });
    } catch (error) {
      console.error(error);
       alert("Ha ocurrido un error al buscar el nombre, por favor vuelve a intentar");
      return dispatch({ type: pokeAction.LOADER_FALSE });
    }
  };
}

export function postPokemon(dataPokemon) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.post("http://localhost:3001/Pokemons", dataPokemon);
       alert("Pokemon Creado");
        dispatch({
        type: pokeAction.POST_POKEMON,
        payload: pokemon,
      });
    } catch (error) {
      console.error(error);
       alert("Ha ocurrido un error, por favor vuelve a intentar");
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const response = await fetch("http://localhost:3001/Types");
      const data = await response.json();
      return dispatch({
        type: pokeAction.GET_TYPES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
       alert("Ha ocurrido un error al obtener los Types, por favor vuelve a intentar");
    }
  };
}

export function fillterPokemonsByType(types) {
  return {
    type: pokeAction.FILTER_POKEMONS_BY_TYPE,
    payload: types,
  };
}

export function fillterPokemonsCreated(created) {
  return {
    type: pokeAction.FILTER_POKEMONS_CREATED,
    payload: created,
  };
}


export function sortPokemonsAlphabetically(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_ALPHABETICALLY,
    payload: sort,
  };
}


export function sortPokemonsByAttack(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_BY_ATTACK,
    payload: sort,
  };
}


export function getDetails(id) {
   return async function (dispatch) {
     try {
       let pokemon = await axios(`http://localhost:3001/Pokemons/${id}`);
       return dispatch({
         type: pokeAction.GET_DETAILS,
         payload: pokemon.data,
       });
     } catch (error) {
       console.error(error);
        alert("Ha ocurrido un error al obtener los detalles, por favor vuelve a intentar");

       return dispatch({ type: pokeAction.LOADER_FALSE });
     }
   };
 }


export function clearDetailsState() {
  return {
    type: pokeAction.CLEAR_DETAILS_STATE,
  };
}


export function trueLoader() {
  return {
    type: pokeAction.LOADER_TRUE,
  };
}


export function falseLoader() {
  return {
    type: pokeAction.LOADER_FALSE,
  };
}


export function cleanMyStore(){
  return{
      type: 'CLEAN_STORE',
  }
}

export function restore(){
  return{
      type: 'RESTORE',
  }
}
