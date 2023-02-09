import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPokemons,
  getTypes,
  fillterPokemonsByType,
  fillterPokemonsCreated,
  sortPokemonsAlphabetically,
  sortPokemonsByAttack,
} from "./Actions/index.js";
import styles from "./Home.module.css";
import Card from "./Card/Card.jsx";
import Paginado from "./Paginado/Paginado.jsx";
import NavHome from "./NavHome/NavHome.jsx";
export default function Home() {
  const dispatch = useDispatch();
  //Estados de Redux
  const allPokemons = useSelector((state) => state.pokemons);
  const typesPokemons = useSelector((state) => state.types);

  /******* Voy a setear estados locales para manejar el paginado *********/
  const [order, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1); //inicializamos en la página 1 para arrancar desde allí
  const [pokemonPerPage] = useState(12); //12 pokemons por página
  const indexOfLastPokemon = currentPage * pokemonPerPage; //voy a guardar el índice del último pokemon por página, para irlos ordenando, ojo es índice no id
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; //0
  const currentPokemons = allPokemons.slice(indexOfFirstPokemon,indexOfLastPokemon); //pokemons en la página actual

  const paginado = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    //componentDitMount, pide (despacha las acciones) los pokemons de la ruta principal y los tipos al montar el componente
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }, []); //NOTA: Podemos poner dispatch como argumento para que se ejecute el useEffect cada vez que se despache una acción, pero como no queremos estarle pegando a cada momento a la ruta de pokemons y tipos lo dejaremos así mientras.
 
  useEffect(() => {
    setCurrentPage(1);
}, [allPokemons]);

  function handleClick(e) {
    dispatch(getTypes());
    dispatch(getAllPokemons());
  }

  function handleFilterTypes(e) {
    dispatch(fillterPokemonsByType(e.target.value));
    setCurrentPage(1);
  }

  function handleFilterCreated(e) {
    dispatch(fillterPokemonsCreated(e.target.value));
    setCurrentPage(1);
  }

  function handleSortAlphabetically(e) {
    dispatch(sortPokemonsAlphabetically(e.target.value));
    setCurrentPage(1); //seteo la página actual en 1
    setOrder(e.target.value); //Seteo el orden actual para que me lo tome y haga el renderizado
  }

  function handleSortByAttack(e) {
    dispatch(sortPokemonsByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(e.target.value);
   }

  return (
    <div className={styles.background}>
      <NavHome
        typesPokemons={typesPokemons}      
        handleSortAlphabetically={handleSortAlphabetically}
         handleSortByAttack={handleSortByAttack}
        handleFilterCreated={handleFilterCreated}
        handleFilterTypes={handleFilterTypes}
      />
      <div className={styles.pokemonscontainer}>

        <button className={styles.refresh} onClick={handleClick}>
          Recargar
        </button>

          <div>
            <Paginado 
              pokemonsPerPage={pokemonPerPage}
              allPokemons={allPokemons}
              currentPage={currentPage}
              paginado={paginado}
            />
            <div className={styles.cards}>
              {currentPokemons?.map((pokemon) => {
                return (
                  <Card
                    name={pokemon.name}
                    img={pokemon.img}
                    types={pokemon.types.slice(0, 2)}
                    key={pokemon.id}
                    id={pokemon.id}
                    create={pokemon.createInDb}
                    className={styles.cards}
                  />
                 );
              })} 
            </div>
          </div>
      </div>
    </div>
  );
}
