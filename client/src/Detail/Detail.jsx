import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetails, clearDetailsState, trueLoader } from "../Home/Actions/index";
import defaultImg from "./who_is.png";
import styles from "./Details.module.css";
export default function Details(props) {

  const {id} = useParams();
  const dispatch = useDispatch();
  //Estados globales de Redux
  const pokemon = useSelector((state) => state.details);
  //const loader = useSelector((state) => state.loader);

  useEffect(() => {
    //componentWillMount
    dispatch(getDetails(id)); //al montar el componente dispara getDetails para cargar la información del pokemon en la ruta de detalles
    return () => {
      //componentWillUnmount
      dispatch(clearDetailsState());
      dispatch(trueLoader());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if(pokemon){
  return (
    <div className={styles.detailscontainer}>
      <Link className={styles.link} to="/Pokemons">
        <div className={styles.wikiimg}>
          <div>       
            <img src="https://gifdb.com/images/high/gengar-umbrella-hex-maniac-pokemon-7e9wn88i0brave5k.gif" alt="not found" />
          </div>
        
        </div>
      </Link>
<div className={styles.details}>
<span className={styles.created}># {pokemon.id}</span>
<h1 className={styles.title}>{(pokemon.name)}</h1>
<h3 className={styles.types}>
            {pokemon.types?.map((type) => {
              return (
                <p className={styles.elemen} key={type}>
                  {type.name}
                </p>
              );
            })}
          </h3>


          <div className={styles.flexdata}>
            <div>
              <img
                className={styles.pokeimg}
                src={pokemon.image ? pokemon.image : defaultImg}
                alt="not found"
              />
            </div>
            <div className={styles.dataskill}>
              <p>
                Vida: <span>{pokemon.hp}</span>
              </p>
              <p>
                Ataque: <span>{pokemon.attack}</span>
              </p>
              <p>
                Defensa: <span>{pokemon.defense}</span>
              </p>
              <p>
                Velocidad: <span>{pokemon.speed}</span>
              </p>
              <p>
                Altura: <span>{pokemon.height}</span>
              </p>
              <p>
                Peso: <span>{pokemon.weight}</span>
              </p>
              {/* <p>
                Likes: <span>{pokemon.Likes}</span>
              </p> */}
            </div>
          </div>
          </div>
          </div>
          )};
}