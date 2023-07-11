import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, cleanDetail } from '../../redux/actions';
import style from './Detail.module.css';

export default function Detail(){
  const dispatch = useDispatch()
  const {idRecipe} = useParams()
  
  const myRecipe = useSelector((state) => state.detail)
  
  
  useEffect(() => {
    dispatch(getDetail(idRecipe)) //de esta forma accedo al id del detalle
    return () => {
      dispatch(cleanDetail())
      }
    }, [idRecipe]  
  )
  const stripTags = (html) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };
  
  const {name, summary, healthScore, steps, diets, image} = myRecipe;
  
  return(
    <div className={style.container}>
      {
        myRecipe ? (
          <div className="recipe-details">
            <img className={style['image']} src={image} alt={name} width='200px' height='200px' />
            <h1 className={style['recipe-details__name']}>Recipe: {name}</h1>
            <h1 className={style['recipe-summary']}>{'Summary: ' + stripTags (summary)}</h1>
            <h1 className={style['recipe-healthScore']}>HealthScore: {healthScore}</h1>
            <h1 className={style['recipe-steps']}>Steps:</h1>
            {Array.isArray(steps) ? ( //verifica si steps es un array
              steps.map((stepObj, index) => (
              <p key={index}>{stepObj.step}</p>
              ))
            ) : (
              <p>{steps}</p>
              )}

              {
                diets && diets.map((diet,index)=>{ //si diets no es nulo u undefined se ejecuta el .map
                  return <h1 className={style['recipe-diets']} key={index}>
                    {index === 0 ? 'Diets: ' : '.'}{diet.name}</h1> 
                })
              }           
              <h1 className={style['recipe-details__Id']}>Id: {idRecipe}</h1>
          </div>
      ) : (
        alert('Error al cargar las dietas!')
      )}
        <br />
      <Link to="/home">
        <button className={style.button}>Back</button>
      </Link>
    </div>
    )
  }
    