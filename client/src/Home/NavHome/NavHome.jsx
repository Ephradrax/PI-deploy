import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar/SearchBar.jsx";
import SortAttackSelect from "./Sort/SortAttackSelect.jsx"
import SortSelect from "./Sort/SortSelect.jsx";
import styles from "./NavHome.module.css";

/******* Componente de NavBar, Contendra el ordenamiento, filtrados y la SearchBar ******/
export default function NavHome({
  typesPokemons,
  handleSortAlphabetically,
  handleFilterCreated,
  handleFilterTypes,
  handleSortByAttack
}) {
  //const [sort, setSort] = useState("Ordenar Alfabéticamente");

  return (
    <React.Fragment>
      <div className={styles.flex}>
          <SortAttackSelect
            handleSort={handleSortByAttack}
            sortDescription="Ataque"

          />
          <SortSelect 
            handleSort={handleSortAlphabetically}
            sortDescription="Nombres"

          />
        
        {/* <p className={styles.filtertext}>Filtrar:</p> */}





        <select onChange={handleFilterTypes} className={styles.filterbydb} >
          <option value="all">Todos</option>
          {typesPokemons?.map((type) => {
            return (
              <option key={type.name} value={type.name}>
                {(type.name)}
              </option>
            );
          })}
        </select>




        <select onChange={handleFilterCreated}className={styles.filterbydb} >
          <option value="all">CreateBy</option>
          <option value="created">BD</option>
          <option value="api">API</option>
        </select>






          <div className={styles.landing} >
            {/* <Link  to="/"  className={styles.link}  > */}
            <Link  to="/"   >

             {/* <button className={styles.landingBtn}>Go Back!</button> */}
             <button className={styles.link}>Go Back!
              {/* <span className={styles.span} >Go Back!</span> */}
              {/* <span >Go Back!</span> */}
              </button>
             </Link>
          </div>




           <SearchBar    />





        <Link to="/create"  >
          <button className={styles.create}>Crear Pokemon</button>
          {/* <button className={s.landingBtn}>Go!</button> */}
        </Link>
      </div>
    </React.Fragment>
  );
}
