const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Recipe, Diet } = require('../../db');
const { Op } = require('sequelize');

module.exports = async (title) => { //se exporta una funcion asincrona que toma param title

  const cleanArray = (array) => { //realiza transf en c/ elem del arr usando metodo map
    return array.map((elem) => {
      return {
        id: elem.id,
        name: elem.title,
        image: elem.image,
        summary: elem.summary,
        healthScore: elem.healthScore,
        diets: elem.diets,
        steps: elem.analyzedInstructions[0]?.steps.map((ele) => `${ele.number} ${ele.step}`).join(" "),
        // en vez de devolverme un array de pasos me devuelve un string
        create: false
      };
    });
  };

  if (title) { //verifica si se proporciona un titulo
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipe.findAll({ //consulta
      where: {
        name: {
          [Op.iLike]: `%${title}%`,
        },
      },
      include: [{
        model: Diet,        
      }]
    });

    const filterApi = cleanArray(recipesApi.data.results); //devuelve un nuevo arreglo transofmrado

    const resultDb= recipesDb.map((recipes)=>{ //aplica una transformacion al arr de la db y lo devuelve
      const{id,name,image,summary, healthScore, steps, diets}=recipes;
      const nva=diets.map(diet=>diet.name)
      return {id,name,image,summary, healthScore, steps, diets: nva,create:true};
    })

    const response = [...resultDb, ...filterApi]; //combina arr

    const result = response.filter((recipes) => recipes.name && recipes.name.toLowerCase().includes(title.toLowerCase()));
    //filtra el arr para obtener las recetas cuyo nombre coincide
    if (result.length === 0) { //verifica si se econtro receta y sino error
      throw new Error(`No se encontraron recetas que coincidan con '${title}'.`);
    }

    return result; //sino devuelve arr que contienen recetas que coincidn con title
  } else {
    const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
    const recipesDb = await Recipe.findAll({
      include: [{
        model: Diet,        
      }]
    });

    const filterApi = cleanArray(recipesApi.data.results);

    const resultDb= recipesDb.map((recipes)=>{
      const{id,name,image,summary, healthScore, steps, diets}=recipes;
      const nva=diets.map(diet=>diet.name)
      return {id,name,image,summary, healthScore, steps, diets: nva,create:true};
    })

    return [...resultDb, ...filterApi];
  }
};


