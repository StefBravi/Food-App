const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Diet } = require('../../db');

const dietsArrayMapper = (arr) =>
    arr.map((elem) => {

        const diets = elem.diets.map(diet => diet);
        if (elem.vegetarian && !diets.includes('vegetarian')) diets.push('vegetarian');
        if (elem.vegan && !diets.includes('vegan')) diets.push('vegan');
        if (elem.glutenFree && !diets.includes('gluten free')) diets.push('gluten free');

        return diets

    });

module.exports = async () => {
  const apiDiets = (
    await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&instructionsRequired=true&number=100`)
).data.results;

const diets = dietsArrayMapper(apiDiets).flat()

diets.forEach(el => {
    Diet.findOrCreate({
        where: { name: el }
    })
});

const allDiets = await Diet.findAll();
return allDiets;
}
//   const recipesApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
//   const recipesData = recipesApi.data; // Obtener los datos de la respuesta de la API

//   const diets = recipesData.results.map(element => element.diets).flat(); // Obtener las dietas de los datos de las recetas
//   const temp = [...new Set(diets)];
//   const response = temp.filter(e => e !== undefined);

//   for (const diet of response) {
//     const existingDiet = await Diet.findOne({ where: { name: diet } });
//     if (!existingDiet) {
//       await Diet.create({ name: diet });
//     }
//   }

//   const allDiets = await Diet.findAll();
//   return allDiets;
// };


