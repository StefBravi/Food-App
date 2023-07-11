import axios from 'axios';

export const GET_RECIPES = 'GET_RECIPES'
export const GET_DIETS = 'GET_DIETS'
export const GET_NAME_RECIPES = 'GET_NAME_RECIPES'
export const FILTER_BY_DIETS = 'FILTER_BY_DIETS'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDERING_NAMES = 'ORDERING_NAMES'
export const ORDERING_HEALTHSCORE = 'ORDERING_HEALTHSCORE'
export const GET_DETAILS = 'GET_DETAILS'
export const CLEAN_DETAIL = 'CLEAN_DETAIL'


//Aca obtengo las recipes
export const getRecipes = () =>{ 
  return async function(dispatch){ // 2) Se retorna esta función y el thunkMiddleware la agarra ejecuta el dispatch
    const apiData = await axios.get( // OJO! Aca sucede la conexión entre el FRONT y el BACK
      'http://localhost:3001/recipes' 
    );
    const recipes = apiData.data;
    dispatch({type: GET_RECIPES, payload: recipes})
  };
};    

//Aca obtengo las recipes
export const getDiets = () =>{ 
  return async function(dispatch){ // 2) Se retorna esta función y el thunkMiddleware la agarra ejecuta el dispatch
    const apiData = await axios.get( // OJO! Aca sucede la conexión entre el FRONT y el BACK
      'http://localhost:3001/diets' 
    );
    const diets = apiData.data;
    dispatch({type: GET_DIETS, payload: diets})
  };
};  

//Busqueda en searchBar
export function getNameRecipes(name) {
  return async function(dispatch) {
    try {
      const apiData = await axios.get(
        'http://localhost:3001/recipes?name=' + name
      );
      return dispatch({
        type: GET_NAME_RECIPES,
        payload: apiData.data
      });
    } catch(error) {
      console.log(error);
    }
  };
}

//Filtro por dietas
export function filterRecipesByDiets(payload){
  return{ 
    type: FILTER_BY_DIETS,
    payload
  }
}

//Filtro por API o BDD
export function filterCreated(payload){
  return{ 
    type: FILTER_CREATED,
    payload
  }
}

//Ordenamiento Asc / Desc
export function orderingByName(payload){
  return{
    type: ORDERING_NAMES,
    payload
  }
}

//Ordenamiento healthScore
export function orderingByHealthScore(payload){
  return{
    type: ORDERING_HEALTHSCORE,
    payload
  }
}

//Detail
export const getDetail = (id)=>{
    const url =`http://localHost:3001/recipes/${id}`;
  return(dispatch)=>{
      axios.get(url)
      .then(({data})=>dispatch({type:GET_DETAILS,payload:data}));
  } ;
};

//cleanDetail
export const cleanDetail = () => {
  return { 
    type: CLEAN_DETAIL
  }
}






