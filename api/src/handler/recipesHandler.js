const getAllRecipes = require ('../controllers/recipes/getAllRecipes')
const postsRecipes = require('../controllers/recipes/postsRecipes')
const {recipeDetail} = require('../controllers/recipes/getById')


const getRecipes = async (req, res) => {
    const { name } = req.query; //Recibe los parámetros de consulta de la solicitud a través de req.query(name)
     try {
        const response = await getAllRecipes(name) //intenta llamar al controller 
        res.status(200).json(response) //si es exitoso devuelve esto
    } catch (error) {
        // aqui marca el error
        res.status(400).json({error: error.message, descripcion: 'error en getRecipes'})
    }
}

const getRecipe = async (req, res) => {
    const { idRecipe } = req.params 
    try { 
        const response = await recipeDetail(idRecipe)      
        res.status(200).json(response)
    } catch (error) {
        // aqui marca el error
        res.status(400).json({error: error.message, descripcion: 'error en getRecipe'})
    }
}

const postRecipes = async (req, res) => {    
    const {name, image, summary, healthScore, steps, diets} = req.body
    try {        
        const response = await postsRecipes(name, image, summary, healthScore, steps)
        await response.addDiets(diets) //asocia las dietas proporcionadas con la receta creada
        res.status(200).json(response)
    } catch (error) {
        // aqui marca el error
        res.status(400).json({error: error.message, descripcion: 'error en postRecipes'}) 
    }
}

/*******************************************************************************/


const putRecipes = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}

const deleteRecipes = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}



module.exports = {
    getRecipe, getRecipes, postRecipes, putRecipes, deleteRecipes
};