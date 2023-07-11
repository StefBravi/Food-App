// import CardsContainer from '../../Components/CardsContainer/CardsContainer'
import React from 'react';
import {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getRecipes, filterRecipesByDiets, filterCreated, orderingByName, orderingByHealthScore} from '../../redux/actions';
import { Link } from 'react-router-dom'
import styles from './Home.module.css'
import Card from '../../Components/Card/Card';
import Paginated from './Paginated.jsx';
import SearchBar from '../../Components/searchBar/searchBar';


export default function Home(){ 

  const dispatch = useDispatch();
  const allRecipes = useSelector((state)=>state.recipes)
  const [orden, setOrden] = useState('')
  const [currentPage, setCurrentPage] = useState(1) //pagina de inicio - currentPage: pagina actual
  const [recipesPerPage] = useState(9) // recipesPerPage: cantidad de cards por pagina 
  const indexOfLastRecipe = currentPage * recipesPerPage // 9 calcular los indices de las recetas a mostrar en la pag actual
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 0
  const currentRecipes =  allRecipes.slice(indexOfFirstRecipe,indexOfLastRecipe) //almacenar recetas en la pag actual

  const paginated = (pageNumber) => { //se utiliza para establecer la pagina actual cdo se cambia de pagina
    setCurrentPage(pageNumber) 
  }
  
  useEffect(() => { // 1) El useEffect hace el Dispatch y se dispara la action
    if (!allRecipes.length){
      dispatch(getRecipes())   
    }},[dispatch]) // cuando haya un cambio en el estado se vuelve a ejecutar el array de dependencia
  
 /* Function recargar recetas */
  function handleClick(event) {
    event.preventDefault()
    dispatch(getRecipes())
  }

  /* Function Filtro tipo de dieta */
  function handleFilterDiets(event){
    dispatch(filterRecipesByDiets(event.target.value)) //se envia una accion al store de redux
    setCurrentPage(1) //reiniciar paginacion y mostrar resultados filtrados desde la 1ra pagina
  }

  /* Function Filtro origen (Api - bdd) */
  function handleFilterCreated(event){
    dispatch(filterCreated(event.target.value))
    setCurrentPage(1)
  }

  /* Function Ordenar Ascendente y Descendente */
  function handleOrderingByName(event){
    if(!event.target.value) return dispatch (getRecipes())
    // event.preventDefaults()
    dispatch(orderingByName(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${event.target.value}`)    
  }

   /* Function Ordenar healthScore */
   function handleOrderingByHealthScore(event){
    if(!event.target.value) return dispatch(getRecipes())
    // event.preventDefaults()
    dispatch(orderingByHealthScore(event.target.value))
    setCurrentPage(1)
    setOrden(`Ordenado ${event.target.value}`)    
  }
  

  return(  
    //Body  
    <div className={styles.body}>
    
    <div className={styles.container}>
      
      {/*Marca*/}
      <h1 className={styles.title}>Cucinare</h1>  

      {/*searchBar*/}
      <SearchBar page={paginated} />

      {/* Volver a cargar recetas */}
      <button className={styles.reload} onClick={event => {handleClick(event)}}>
        Reload recipes
      </button>       

    <div> 

      {/*Ordenar Ascendente y Descendente*/}
      <select className={styles.orderAsc} onChange={event => handleOrderingByName(event)} >
        <option value='' >Asc - Desc</option>
        <option value='asc'>A - Z</option>
        <option value='desc'>Z - A</option>
      </select>
      
      {/*Ordenar HealthScore*/}
      <select className={styles.healthScore} onChange={event => handleOrderingByHealthScore(event)} >
        <option value='' >HealthScore</option>
        <option value='health'>Healthier</option>
        <option value='notHealth'>Less healthy</option>
      </select>
      
      {/*Filtro Tipo de dieta */} {/*onChange especifica funcion que se ejecutara cuando cambie select*/}
      <select className={styles.diet} onChange={event => handleFilterDiets(event)} >
        <option value='all'>All diets</option>
        <option value='gluten free'>Gluten free</option>
        <option value='dairy free'>Dairy free</option>
        <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
        <option value='vegan'>Vegan</option>
        <option value='paleolithic'>Paleolithic</option>
        <option value='primal'>Primal</option>
        <option value='whole 30'>Whole 30</option>
        <option value='pescatarian'>Pescatarian</option>
        <option value='ketogenic'>Ketogenic</option>
        <option value='fodmap friendly'>Fodmap friendly</option>
      </select>

      {/*Filtro Origen (Api - bdd)*/}
      <select className={styles.apiBdd} onChange={event => handleFilterCreated(event)}>
        <option value='all'>Show all</option>
        <option value='api' >API</option>
        <option value='create' >DataBase</option>
      </select>

      {/*Renderizado de Paginated.jsx*/}
      <Paginated
      recipesPerPage = {recipesPerPage}
      allRecipes = {allRecipes.length}
      paginated = {paginated}
      />     
      
      {/*Cards (image, name, diets) */}
    <div className={`${styles.cardContainer} ${styles.gridContainer}`}>  
      {currentRecipes?.map((elem) => (
        <div className={`${styles.card}`}key={elem.id}>
            <Link to={`/home/${elem.id}`} className={`${styles.link}`}>
              <Card 
                image={elem.image} 
                name={elem.name} 
                diets={elem.diets}
                steps={elem.steps}
                key={elem.id}
                id={elem.id}
                className={`${styles.card}`}
              />
            </Link>
          </div>
        ))}
        </div>
      </div>
    </div>
    </div> 
  );
}

   
        
 
          
      
 


