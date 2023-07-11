const axios = require ('axios')
require('dotenv').config();
const {API_KEY} = process.env;
const {Recipe, Diet} = require ('../../db');

const cleanArray = (array) => {
  return array.map((elem) => {
    return {
      id: elem.id,
      name: elem.title,
      image: elem.image,
      summary: elem.summary,
      healthScore: elem.healthScore,
      diets: elem.diets,
      steps: elem.analyzedInstructions
        .flatMap((instruction) => instruction.steps)
        .filter((step) => step && step.number && step.step)
        .map(({ number, step }) => ({ number, step })),
      create: false
    };
  });
};
const recipeDetail = async (idRecipe) => {  
  if (!idRecipe) { //verifica que no haya un id, sino lanza error
    throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipe}'.`);
  }

  // verifica si lo que se manda es un UUID valido
  const idIsUUID = (typeof idRecipe === 'string' && idRecipe.match(/[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}/gi));
  let recipe;

  if (idIsUUID) { //sii es un UUID valido realiza busqueda de la receta en bdd
    recipe = await Recipe.findByPk(idRecipe, {
      include: [{
        model: Diet,
      }]
    });
  } else { //si no es una solicitud a la bdd lo pide a la api
    const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    recipe = cleanArray([recipeApi.data])[0]; //devuelve un arr trasformado con la rta
  }

  if (!recipe) { //verifica si no se encontró ninguna receta 
    throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipe}'.`);
  }

  // retorna un arr string con name: diet
  const diets = recipe.diets.map((diet) => {
    return typeof diet === 'string' ? { name: diet } : { name: diet.name };
  });

  // Format steps array
  // const steps = recipe.steps.map((step) => {
  //   return {
  //     number: step.number,
  //     step: step.step
  //   };
  // });

  return { //devuelve un objeo que contiene las propiedades de l areceta incluyendo id
    id: recipe.id,
    name: recipe.name,
    image: recipe.image,
    summary: recipe.summary,
    healthScore: recipe.healthScore,
    diets: diets,
    steps: recipe.steps,
    create: recipe.created || false
  };
};
module.exports = {recipeDetail};

// const axios = require ('axios')
// require('dotenv').config();
// const {API_KEY} = process.env; //se importa con el objeto de no tener que poner la api key original 
// const {Recipe, Diet} = require ('../../db') 

// const cleanArray = (array) => {
//   return array.map((elem) => {
//     return {
//       id: elem.id,
//       name: elem.title,
//       image: elem.image,
//       summary: elem.summary,
//       healthScore: elem.healthScore,
//       diets: elem.diets,
//       steps: elem.analyzedInstructions
//         .flatMap((instruction) => instruction.steps)
//         .filter((step) => step && step.number && step.step)
//         .map(({ number, step }) => ({ number, step })),
//       created: 'f'
//     };
//   });
// };

// module.exports = async (idRecipe) => {
//   if (!idRecipe) throw new Error(`No se encontraron recetas que coincidan con el id: '${idRecipe}'.`);

//   const recipeApi = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);

//   if (recipeApi.data) {
//     const filterApi = cleanArray([recipeApi.data]);
//     return filterApi;
//   } else {
//     const recipeDb = await Recipe.findByPk(idRecipe, {
//       include: [{
//         model: Diet,        
//       }]
//     });
//     const resultDb= recipesDb.map((recipes)=>{
//       const{id,name,image,diets}=recipes;
//       const nva=diets.map(diet=>diet.name)
//       return {id,name,image,diets: nva,created:'true'};
//     })
//      return resultDb;
//   }
// };