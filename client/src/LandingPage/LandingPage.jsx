import React from "react";
import {Link} from "react-router-dom";
import s from'./LandingPage.module.css';

export default function LandingPage(){
    return(
        <div className={s.landingPageContainer}>
            <div className={s.landing}>
                <Link to='/Pokemons'>
                    <button className={s.landingBtn}>Go!</button>
                </Link>
            </div>
            <div className={s.loadingApp}>
                <h4>Ready to GO!</h4>
            </div>
        </div>
    )
}