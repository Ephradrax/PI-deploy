

// import { pokeAction } from "../paginas/actions/index";
 import { pokeAction } from "../Home/Actions/index";
const inicialState = {
  pokemons: [], //estado actual
  pokemonsTypesFilter: [], //estado de los pokemons filtrados
  pokemonsCopy: [], //copia del estado original siempre va a tener todos los pokemon del api y bd
  types: [], //guarda el arreglo de los tipos
  details: [],
  searchPokemons: [], //para guardar los pokemon buscados con la SearchBar
  loader: true, //para setear un loader
  
};

function rootReducer(state = inicialState, action) {
  switch (action.type) {
    //taer a todos los pokemones de la ruta principal
    case pokeAction.GET_ALL_POKEMONS:
      return {
        ...state,
        loader: false,
        pokemons: [...state.searchPokemons, ...action.payload], //en mi estado de pokemons, que en un principio es un arreglo vacío, manda todo lo que te envie la acción
        pokemonsCopy: [...state.searchPokemons, ...action.payload], //una copia que siempre voy a mantener con todos los pokemons que envía el back
        pokemonsTypesFilter: action.payload, // para no perder los estados filtrados al buscar entre pokemons del api y creados, la inicializa con todos los pokemon en un pricipio
      };
    case pokeAction.GET_POKEMON:
      //traer a un pokemon por su nombre o id
      const findPokemon = state.pokemonsCopy.filter(
        (pokemon) => pokemon.id === action.payload.id
      );
      if (findPokemon.length) {
        return {
          ...state,
          pokemons: [action.payload],
          loader: false,
        };
      } else {
        return {
          ...state,
          pokemons: [action.payload], // si hago get a un pokemon que no esté en el estado actual, lo guardo en un arreglo y luego lo paso al principal
          searchPokemons: [action.payload, ...state.searchPokemons],
          loader: false,
        };
      }
    case pokeAction.POST_POKEMON:
      //crear a un pokemon y guardarlo en la base de datos
      return {
        ...state,
      };
    case pokeAction.GET_TYPES:
      //obtener los tipos de pokemones
      return {
        ...state,
        types: action.payload,
      };
    case pokeAction.FILTER_POKEMONS_BY_TYPE:
      //Filtrar a los pokemones por tipo
      const allPokemons = state.pokemonsCopy; //voy a tener pokemonsCopy que siempre va a tener una copia del estado completo, y el estado que se va a esatar enviando filtrado va a ser pokemons, así cada vez que vaya a filtrar nuevamente, voy a tomar como referencia a la copia con el estado original de todos los pokemons
      const typesFiltered =
        action.payload === "all"
          ? allPokemons
          : allPokemons.filter((pokemon) =>
              { return pokemon.types.some((d) => d.name === action.payload)}
          //pokemon.types.includes(action.payload)
            );
      return {
        ...state,
        pokemons: typesFiltered,
        pokemonsTypesFilter: typesFiltered,
      };
    case pokeAction.FILTER_POKEMONS_CREATED:
      //filtrar a los pokemones por si estos vienen del api o son creados por el usuario
      const allPokemons2 = state.pokemonsTypesFilter;
      let createdFilter = [];
      if (action.payload === "created") {
        createdFilter = allPokemons2.filter((pokemon) => pokemon.createInDb);
      } else if (action.payload === "api") {
        createdFilter = allPokemons2.filter((pokemon) => !pokemon.createInDb);
      } else {
        createdFilter = allPokemons2.slice();
      }
      return {
        ...state,
        pokemons: createdFilter,
      };
    case pokeAction.SORT_POKEMONS_ALPHABETICALLY:
      //ordenar a los pokemones de forma alfabética
      let sortedArr1 = [];
      if (action.payload === "asc") {
        //ordena de forma ascendente (A - Z)
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return 1;
          if (a.name < b.name) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        //ordena de forma descendente (Z - A)
        sortedArr1 = state.pokemons.sort((a, b) => {
          if (a.name > b.name) return -1;
          if (a.name < b.name) return 1;
          return 0;
        });
      } else {
        // si se elije ordenar, es decir default, devuelve una copia de pokemonsCopy con el orden original
        sortedArr1 = state.pokemonsCopy.slice();
      }
      return {
        ...state,
        pokemons: sortedArr1,
      };
    case pokeAction.SORT_POKEMONS_BY_ATTACK:
      //ordena a los pokemones por ataque
      let sortedArr2 = [];
      if (action.payload === "asc") {
        sortedArr2 = state.pokemons.sort((a, b) => {
          if (a.attack > b.attack) return 1;
          if (a.attack < b.attack) return -1;
          return 0;
        });
      } else if (action.payload === "desc") {
        sortedArr2 = state.pokemons.sort((a, b) => {
          if (a.attack > b.attack) return -1;
          if (a.attack < b.attack) return 1;
          return 0;
        });
      } else {
        sortedArr2 = state.pokemons.slice();
      }
      return {
        ...state,
        pokemons: sortedArr2,
      };
    case pokeAction.GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case pokeAction.CLEAR_DETAILS_STATE:
      //Limmpiar (vaciar) el estado de detalles
      return {
        ...state,
        details: [],
      };
    case pokeAction.LOADER_TRUE:
      //camiar el loader a true
      return {
        ...state,
        loader: true,
      };
    case pokeAction.LOADER_FALSE:
      //cambiar el loader a false
      return {
        ...state,
        loader: false,
      };
    case 'RESTORE':
        return{
            ...state,
            pokemons: state.pokemonsCopy,
            // pokemons: [],
        }
    
    default:
      return state;
  }
}
export default rootReducer;



// const initialState = {
//     pokemon : [],
//     pokemonFiltered : [],
//     pokemonDetail : [],
//     types : [],
// };

// function rootReducer(state = initialState, action){
//     switch(action.type){
//         case 'GET_POKEMONS':
//             return {
//                 ...state,
//                 pokemon: action.payload,
//                 pokemonFiltered: action.payload,
//             }
//         case 'GET_BY_NAME':
//             if(!action.payload.length){return alert('Pokemon not Found')}
//             return {
//                 ...state,
//                 pokemon: action.payload,
//             }
//         case 'GET_TYPES':
//             return {
//                 ...state,
//                 types: action.payload,
//             }
//         case 'GET_DETAIL':
//             return {
//                 ...state,
//                 pokemonDetail: action.payload,
//             }
//             case 'FILTER_BY_TYPE':
//                 let allPokemonsType = state.pokemonFiltered;
//                 let typeFiltered = action.payload === 'all' ? allPokemonsType : allPokemonsType.filter((e) => {
//                     return e.types.some((d) => d.name === action.payload)
//                 });
//                 return{
//                     ...state,
//                     pokemon: typeFiltered,
//             }
//         case 'FILTER_BY_STATE':
//             let allPokemonsState = state.pokemonFiltered;
//             let stateFiltered = action.payload === 'none' ? allPokemonsState : allPokemonsState.filter((e) => {
//                 return e.createInDb === action.payload
//             });
//             return {
//                 ...state,
//                 pokemon: stateFiltered
//             }
//         case 'ORDER_POKEMONS':
//             if(action.payload === 'asc'){
//             state.pokemon.sort(function(a, b){
//                 if(a.name > b.name){
//                     return 1;
//                 }
//                 if(b.name > a.name){
//                     return -1;
//                 }
//                 return 0;
//             })
//             }
//             if(action.payload === 'des'){
//                 state.pokemon.sort(function(a, b){
//                     if(a.name > b.name){
//                         return -1;
//                     }
//                     if(b.name > a.name){
//                         return 1;
//                     }
//                 })
//             }
//             if(action.payload === 'weakness'){
//                 state.pokemon.sort(function(a, b){
//                     if(a.attack  > b.attack ){
//                         return 1;
//                     }
//                     if(b.attack  > a.attack ){
//                         return -1;
//                     }
//                     return 0;
//                 })
//             }
//             if(action.payload === 'stronger'){
//                 state.pokemon.sort(function(a, b){
//                     if(a.attack  > b.attack ){
//                         return -1;
//                     }
//                     if(b.attack  > a.attack){
//                         return 1;
//                     }
//                 })
//             }
//             if(action.payload === 'none'){
//             }
//                 return{
//                     ...state,
//                     pokemon: state.pokemon,
//                 }
//             case 'CLEAN_STORE':
//                 return{
//                     ...state,
//                     pokemonDetail: [],
//                 }

//             default:
//             return state;
//     };
// };

// export default rootReducer;