import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTypes, postPokemon } from "../Home/Actions/index.js";
// import { capitalizeString, urlPatternValidation } from "../Home/test/utils";
import styles from "./PokemonCreate.module.css";
import {validate} from "./validator"

export default function PokemonCreate() {
  const dispatch = useDispatch();
  //Estados de Redux y locales de React
  const typesPokemons = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
    image: "",
   // Likes: "",
    types: [],
  });
  const [error, setError] = useState({});//Estados locales para errores
  const [disabled, setDisabled] = useState(true);//Estado local para desabilitar o habilitar el botón de enviar
  const history = useHistory();//Hook useHoistory permite hacer una redirección a una página dada
  //const ReDirect = NavLink(); //la version actual de useHistory

  //componentWillMount
  useEffect(() => {
    dispatch(getTypes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Handlers
  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.trim(),//Al campo actual le elimino los espacios a los lados
    });
    setError(
      validate({//validamos los errores
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postPokemon(input)); //despachamos la acción que se va a encargar de crear al pokemon, envía la data al backend
    // alert("Pokemon Creado");
    setInput({
      name: "",
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
      image: "",
//      Likes: "",
      types: [],
    });
    setTimeout(() => {
      history.push("/Pokemons");
    }, 1000)
  }
  function handleCheck(e) {
    //Para seleccionar los tipos del pokemon
    if (e.target.checked) {
      //cuando este es seleccionado guarda el tipo en un arreglo
      setInput({
        ...input,
        types: [...input.types, e.target.value],
      });
    }
    if (!e.target.checked) {
      //cuando el tipo es deselecconado, lo saca del array de tipos
      input.types.splice(input.types.indexOf(e.target.value), 1);
      setInput({
        ...input,
      });
    }

    setError(
      validate({ //validamos errores
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }
  //componentWillUpdate, escucha los cambios en los estados de error, input y setDisabled, para disparar el control de errores
  useEffect(() => {
    if (
      input.name.length > 0 &&
      input.types.length < 3 &&
      !error.hasOwnProperty("image") &&
      !error.hasOwnProperty("hp") &&
      !error.hasOwnProperty("attack") &&
      !error.hasOwnProperty("defense") &&
      !error.hasOwnProperty("speed") &&
      !error.hasOwnProperty("height") &&
      !error.hasOwnProperty("weight")
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [error, input, setDisabled]);
  
  return (
      <div className={styles.all}>
          <div >
           
            <a  href="/Pokemons"  className={styles.wikiimg}> <img src={"https://gifdb.com/images/high/gengar-umbrella-hex-maniac-pokemon-7e9wn88i0brave5k.gif"} alt="not found"/>   </a>

            
            {/* <button className={styles.link}>Go Back!</button> */}
          
          </div>
        {/* <div className={styles.landing} >
          
            <Link  to="/"   >

             
             <button className={styles.link}>Go Back!</button>
             </Link>
          </div> */}


      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Crea tu Pokemon</h1>
          <section className={styles.datacontainer}>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Nombre:</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Nombre"
                  name="name"
                  value={input.name}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {error.name && (
                  <p className={styles.errormessage}>{error.name}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Vida:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Vida"
                  name="hp"
                  value={input.hp}
                  onChange={handleChange}
                />
                {error.hp && <p className={styles.errormessage}>{error.hp}</p>}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Ataque:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Ataque"
                  name="attack"
                  value={input.attack}
                  onChange={handleChange}
                />
                {error.attack && (
                  <p className={styles.errormessage}>{error.attack}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Defensa:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Defensa"
                  name="defense"
                  value={input.defense}
                  onChange={handleChange}
                />
                {error.defense && (
                  <p className={styles.errormessage}>{error.defense}</p>
                )}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Velocidad:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Velocidad"
                  name="speed"
                  value={input.speed}
                  onChange={handleChange}
                />
                {error.speed && (
                  <p className={styles.errormessage}>{error.speed}</p>
                )}
              </div>
              <div className={styles.flexinput}>
                <label>Altura:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Altura"
                  name="height"
                  value={input.height}
                  onChange={handleChange}
                />
                {error.height && (
                  <p className={styles.errormessage}>{error.height}</p>
                )}
              </div>
            </div>
            <div className={styles.flexform}>
              <div className={styles.flexinput}>
                <label>Peso:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Peso"
                  name="weight"
                  value={input.weight}
                  onChange={handleChange}
                />
                {error.weight && (
                  <p className={styles.errormessage}>{error.weight}</p>
                )}
              </div>

{/* 
              <div className={styles.flexinput}>
                <label>Likes:</label>
                <input
                  className={styles.input}
                  type="number"
                  placeholder="Likes"
                  name="Likes"
                  value={input.Likes}
                  onChange={handleChange}
                  autoComplete="off"
                />
                </div> */}



              <div className={styles.flexinput}>
                <label>Imagen:</label>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="url..."
                  name="image"
                  value={input.image}
                  onChange={handleChange}
                  autoComplete="off"
                />
                {error.image && (
                  <p className={styles.errormessage}>{error.image}</p>
                )}
              </div>
            </div>
          </section>



          <label style={{ fontWeight: "bold" }}>Tipo:</label>

          <div className={styles.checkcontainer}>

            {typesPokemons.map((type) => {
              return (
                <div key={type.name}>
                  <p className={styles[type.name]}>
                    {(type.name)}
                  </p>
                  <input 
                    type="checkbox"
                    name={type.name}
                    value={type.name}
                    onClick={handleCheck}
                  />
                </div>
              );
            })}
            {input.types.length > 2 ? (
              <p className={styles.errormessage2}>Seleccione Máximo 2 Tipos</p>
            ) : null}
          </div>

          <button className={styles.btnsend} type="submit" disabled={disabled}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}


//--------------------------------------------------------------------