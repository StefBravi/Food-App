const getAllDiets = require('../controllers/diets/getAllDiets')


const getDiets = async (req, res) => {
    try {
        const response = await getAllDiets()
        res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message, descripcion: 'error en getDiets'}) 
    }
}

/*******************************************************************************/

const getDiet = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}

const postDiets = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}

const putDiets = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}

const deleteDiets = async (req, res) => {
    try {
        // aqui salió todo bien 
    } catch (error) {
        // aqui marca el error
    }
}



module.exports = {
    getDiets, getDiet, postDiets, putDiets, deleteDiets
};