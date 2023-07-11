import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../../redux/actions";
import styles from "./searchBar.module.css";

export default function SearchBar({page}) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
 
  function handleInputChange(event) {
    event.preventDefault();
    setName(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    page(1)
    if (name.trim() === "") {
      alert("Ingrese un nombre de receta válido."); // Mostrar mensaje de alerta si el campo de búsqueda está vacío
    } else {
      dispatch(getNameRecipes(name))
        .then((response) => {
          if (response.payload.length === 0) {
            alert("No se encontraron recetas. Intente nuevamente."); // Mostrar mensaje de alerta si no se encontraron recetas
          }
        })
        .catch((error) => {
          console.log(error);
          alert("Se produjo un error. Intente nuevamente."); // Mostrar mensaje de alerta si hay un error en la solicitud
        });
    }
  }

  return (
    <div className={styles["search-bar"]}>
      <input
        type="text"
        className={styles["search-input"]}
        placeholder="Ingrese su receta..."
        onChange={(event) => handleInputChange(event)}
      />
      <button
        type="submit"
        className={styles["search-button"]}
        onClick={(event) => handleSubmit(event)}
      >
        Buscar
      </button>
    </div>
  );
}



// import React from "react";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getNameRecipes } from '../../redux/actions' 
// import styles from './searchBar.module.css'


// export default function SearchBar(){
//     const dispatch = useDispatch()
//     const[name, setName] = useState("") //estado local

//     function handleInputChange(event){
//         event.preventDefault()
//         setName(event.target.value)
//         console.log(name)
//     }

//     function handleSubmit(event){
//         event.preventDefault()
//         dispatch(getNameRecipes(name))
//     }

//     return(
//         <div className={styles['search-bar']}>
//             <input 
//             type="text"
//             className={styles["search-input"]} 
//             placeholder="Ingrese su receta..."
//             onChange={(event) => handleInputChange(event)}
//             />
//             <button type="submit" 
//             className={styles["search-button"]} 
//             onClick={(event) => handleSubmit(event)}>
//                 Buscar</button>
//         </div>
//     )
// }