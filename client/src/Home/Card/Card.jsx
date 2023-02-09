import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";

export default function Card({ name, img, types, id, create }){
    return(
        <Link to={`/Pokemons/${id}`} className={styles.card} style={{textDecoration: 'none'}}>
            <div>
                <h3 className={styles.name}>{name[0].toUpperCase() + name.slice(1)}</h3>
                <div className={styles.type}>
                {   types &&
                    types.map(e => (
                        <h5 key={e.name}>{e.name}</h5>
                    ))
                }
                </div>
                <img src={img} alt="Image not found" className={styles.img}/>
            </div>
        </Link>
    );
};
