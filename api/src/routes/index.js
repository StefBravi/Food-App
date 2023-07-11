const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require ('./recipesRouter')
const dietsRouter = require ('./dietsRouter')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRouter) // las rutas que terminen en /recipes seran manejadas por el router 'recipesRouter'
router.use('/diets', dietsRouter) // las rutas que terminen en /diets seran manejadas por el router 'dietsRouter'

module.exports = router;
