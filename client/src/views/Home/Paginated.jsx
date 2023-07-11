import React from "react";
import styles from './Paginated.module.css'

export default function Paginated({ recipesPerPage, allRecipes, paginated }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allRecipes / recipesPerPage)-1; i++) {
    pageNumbers.push(i+1);
  }

  return ( //este componente renderiza los numeros
    <nav>
      <div className={styles.paginated}>
            { pageNumbers && pageNumbers.map(num => {
               return <button key={num} className={styles.number} onClick={()=>paginated(num)}> {num} </button>
            }) }
        </div>
    </nav>
  );
}
