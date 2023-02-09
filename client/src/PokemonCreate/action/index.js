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
      // const response = await fetch("http://localhost:3001/Pokemons");
      // const data = await response.json();
      //  dispatch({
      //   type: pokeAction.GET_ALL_POKEMONS,
      //   payload: data,
      // });
     
        let json = await axios.get('http://localhost:3001/Pokemons');
        console.log(json.data)
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
// export function getAllPokemons() {
//   return function (dispatch) {
//     axios("/pokemons")
//       .then((pokemons) => {
//         return dispatch({
//           type: pokeAction.GET_ALL_POKEMONS,
//           payload: pokemons.data,
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         alert("Ha ocurrido un error, por favor vuelve a intentar");
//       });
//   };
// }

//acción que permite traer a un pokemon por su nombre exacto o su id
export function getPokemon(name) {
  return async function (dispatch) {
    try {
      const pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`
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

//acción que permite crear a un pokemon con los datos obtenidos desde el formulario controlado
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


//--------------------------------------------------------------------------------------------------






//acción que permite traer todos los types de los pokemones
export function getTypes() {
  return async function (dispatch) {
    try {
      // const response = await fetch("https://pokeapi.co/api/v2/type");
      // console.log(response);
      // const data = await response.json();
      // console.log(data);
      // dispatch({
      //   type: "GET_TYPE",
      //   payload: data.results,
      // });
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





//-------------------------------------------------------------------------------------------------------






//acción que permite filtrar a los pokemones por tipo
export function fillterPokemonsByType(types) {
  return {
    type: pokeAction.FILTER_POKEMONS_BY_TYPE,
    payload: types,
  };
}

//acción que permite filtrar a los pokemones si estos vienen del api o de la base de datos
export function fillterPokemonsCreated(created) {
  return {
    type: pokeAction.FILTER_POKEMONS_CREATED,
    payload: created,
  };
}

//acción que permite ordenar a los pokemones de forma alfabética
export function sortPokemonsAlphabetically(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_ALPHABETICALLY,
    payload: sort,
  };
}

//acción que permite ordenar a los pokemones por fuerza (actualmente en desuso)
export function sortPokemonsByAttack(sort) {
  return {
    type: pokeAction.SORT_POKEMONS_BY_ATTACK,
    payload: sort,
  };
}

//acción que permite traer un pokemon por su id para la ruta de detalles
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
//const afg = await fetch(`http://localhost:3001/Pokemons/${id}`);
//const kkk = await afg.json();

// return dispatch({
//   type: pokeAction.GET_DETAILS,
//   payload: kkk,
// });
// } catch (error) {
// console.error(error);
//  alert("Ha ocurrido un error al obtener los Detalles, por favor vuelve a intentar");
// }
// };
// }









//acción que permite limpiar el estado de detalles
export function clearDetailsState() {
  return {
    type: pokeAction.CLEAR_DETAILS_STATE,
  };
}

//acción que permite cambiara true el estado de loader
export function trueLoader() {
  return {
    type: pokeAction.LOADER_TRUE,
  };
}

//acción que permite cambiar a false es estado de loader
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