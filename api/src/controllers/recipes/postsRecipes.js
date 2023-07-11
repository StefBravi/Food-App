const { Recipe } = require('../../db')
//exporta una funcion asincrona sin nombre que acepta varios paramentros qeu representan una receta a crear
module.exports = async (name, image, summary, healthScore, steps, create) => {
    const newRecipe = await Recipe.create({name, image, summary, healthScore, steps, create})
    return newRecipe //con modelo recipe y Create para crear una nueva instancia de receta en la bdd
} //return newRecipe: devuelva la nueva receta creada desde la bdd


