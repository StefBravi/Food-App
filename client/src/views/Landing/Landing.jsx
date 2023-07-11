import React from "react";
import { Link } from "react-router-dom";
import styles  from "./Landing.module.css";

function Landing() {
    return(
      <div className={styles.container}>
        <h1 className={styles.title}>Bienvenidos a Cucinare</h1>
        <Link to ='/home'> 
        <button>Ingresar</button>
        </Link>
      </div> 
          
    )
  }
  
  export default Landing;

  
  // Cosas para ver: 
  // ver barra laeral izquierda en CSS. Se puede sacar, pero se sale en todas las otras paginas
  //poner el logo arriba de la bienvenida
  