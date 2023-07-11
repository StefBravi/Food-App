{/*Delete*/}

// const { Recipes } = require('../../db');

// const deleteRecipe = async (idRecipes) => {
//   try {
//     const recipe = await Recipes.findOne({ where: { id: idRecipes } });
// //busco en la base de datos la receta que coindida con ese id para elimnarla)
//     if (!recipe) {
//       throw new Error('La receta no existe');
//     }

//     await recipe.destroy();
// //si la encuentra, utiliza destroy para eliminarla
//     return { message: 'Receta eliminada exitosamente' };
//   } catch (error) {
//     throw new Error('Ha ocurrido un error al eliminar la receta');
//   }
// };

// module.exports = deleteRecipe;

{/*Handler*/}
// const deleteRecipeHandler = async (req, res) => {
//     const { idRecipes } = req.params;
//       try {
//         const response = await deleteRecipe(idRecipes);
//         res.status(200).json(response);
//       } catch (error) {
//         res.status(400).json({ error: error.message });
//       }
//     };

//*************************************************************************************************************************** */

{/*Put*/}

//importo  getById
//const recipes (name, image, summary, healthScore, steps, diets)
//const upDateRecipe = (idRecipes, name, image, summary, healthScore, steps) =>{
    //const recipe= getById(idRecipes)
    //if (recipe.error) return recipe;
    //recipe.name = name
    //recipe.image = image
    //recipe.summary = summary
    //recipe.healthScore = healthScore
    //recipe.steps = steps
    //return recipe;
    //}

{/*Handler*/}

// const putRecipe = async (req, res) => { //exporto putRecipe para las rutas
//   const { idRecipes } = req.params; //por id busca
//  const { name, image, summary, healthScore, steps, diets } = req.body; // los datos se reciben por body // le llega lo que quiere actualizar
//   try {
//       const putById= upDateRecipe(idRecipes,name, image, summary, healthScore, steps, diets) //upDateRecipes viene de controller
//       res.status(200).json(putById);
//   } catch (error) {
//       res.status(400).json({ error: error.message, descripcion: 'No se ha encontrado el id' });
//   }
// };
