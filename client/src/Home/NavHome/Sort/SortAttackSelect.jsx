import React from "react";
import styles from "./SortAttackSelect.module.css";
//Componente de ordenamiento, sirve para pasar distintos tipos de ordenamientos, aunque actualmente solo se usar para pasarle ordenamiento alfabético desde el componente NavHome
export default function SortAttackSelect({ sortDescription, handleSort }) {
  return (
    <select onChange={handleSort} className={styles.filterbydb}>
      <option value="default">{sortDescription}</option>
       <option value="asc">Ascendente</option>
      <option value="desc">Descendente</option> 
    </select>
  );
}
