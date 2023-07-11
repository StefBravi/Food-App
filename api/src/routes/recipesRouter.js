const { Router } = require('express') //es utilizado para definir las rutas en Express
const { getRecipe, getRecipes, postRecipes, putRecipes, deleteRecipes
} = require('../handler/recipesHandler') //controladores de rutas relacionados con las recetas.

// Router
const recipesRouter = Router() //Instancia del enrutador. se utilizará para definir las rutas 
//relacionadas con las recetas.

// Routes
recipesRouter.get('/:idRecipe', getRecipe) // se encargarán de manejar las solicitudes entrantes a estas rutas.
recipesRouter.get('/', getRecipes)
recipesRouter.post('/', postRecipes)

/****************************************************/

recipesRouter.put('/', putRecipes)
recipesRouter.delete('/', deleteRecipes)

module.exports = recipesRouter;