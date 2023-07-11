import {  GET_RECIPES, GET_DIETS, GET_NAME_RECIPES, FILTER_BY_DIETS, 
          FILTER_CREATED, ORDERING_NAMES, ORDERING_HEALTHSCORE,
          GET_DETAILS, CLEAN_DETAIL} from './actions'

// Estado global
const inialState = { 
   recipes: [],
   allRecipes: [],
   detail:{},
   diets:[]
  }
  
  const rootReducer = (state = inialState, action) => { // 3) El reducer recibe la action
    const allRecipes = state.allRecipes 
    
  

  switch (action.type) { // 4) evalua la action.type
    case GET_RECIPES:
      return {
        ...state,
        allRecipes: action.payload, 
        recipes: action.payload // 5) crea un estado nuevo con las modificaciones
        }
        
    case GET_DIETS:
      return {
        ...state,
        diets: action.payload // 5) crea un estado nuevo con las modificaciones
        }

    case GET_NAME_RECIPES:
      return {
      ...state,
      recipes: action.payload
        }

    case FILTER_BY_DIETS:
      const selectedDiet = action.payload; //action.payload se refiere al tipo de dieta seleccionada
      console.log(selectedDiet)
      const filterByDiet = 
      selectedDiet === 'all' 
      ? allRecipes //esta es la que se utiliza en FILTER_BY_DIETS
      : allRecipes.filter(recipe =>
        recipe.diets.includes(selectedDiet)) // evalua si la dieta seleccionada se incluye en la diets
      return{...state,
         recipes: filterByDiet
        }

    case FILTER_CREATED:
        const allRecipes2 = state.allRecipes
        const createdFilter = 
        action.payload === 
        'create' ? allRecipes.filter( elem => elem.create) : allRecipes2.filter( elem => !elem.create)
        return{ 
          ...state,
          recipes: action.payload === 'all' ? state.allRecipes : createdFilter
        }

    case ORDERING_NAMES:
      let sortedArr = state.recipes
      if (action.payload === "asc")
        sortedArr.sort((a, b) => a.name.localeCompare(b.name));
      if (action.payload === "desc")
      sortedArr.sort((a, b) => b.name.localeCompare(a.name));
     
        return{
          ...state,
          recipes: sortedArr
        }
        
    case ORDERING_HEALTHSCORE:
      let sortedArr2 = state.recipes
    if (action.payload === "notHealth")
      sortedArr2.sort((a, b) => a.healthScore - b.healthScore);
    if (action.payload === "health")
      sortedArr2.sort((a, b) => b.healthScore - a.healthScore);
      return{
        ...state,
        recipes: sortedArr2
        }   
    
    case GET_DETAILS:
       return{ 
        ...state,
        detail: action.payload
        }

    case CLEAN_DETAIL:
        return{
          ...state,
          detail: {}
        }  

    default:
      return {...state};
  }
};

export default rootReducer;


