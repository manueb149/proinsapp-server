const router = require("express").Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middleware/auth');

// Iniciar sesión
// api/auth
router.post('/', 
    authController.authenticateUser
);

// Obtiene el usuario autenticado
// api/auth
router.get('/',
    auth,
    authController.userAuthenticated
);

module.exports = router;