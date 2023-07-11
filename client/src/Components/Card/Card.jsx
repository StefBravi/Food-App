import React from 'react'
import style from './Card.module.css' 
import { Link } from 'react-router-dom'


export default function Card ({name, image, diets, id}){ 
 return (
    <div className={style.card}>
       <img src={image} alt='' width='200px' height='250px' />
       
       <h3>{name}</h3>
       
       <h5>{diets.join(', ')}</h5>

       <div>
          <Link to={`/detail/${id}`} className={style.detail}>
            <button >Details</button>
          </Link>
        </div>
    </div>
  )
}



// Este componente debe mostrar la info de c/
// dieta mapeada, pero ademas, darnos un link 
// para ir al detalle del ususario en cues-
// tión  