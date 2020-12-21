const router = require("express").Router();
const controller = require("../controllers/user.controller");
const { check } = require('express-validator');

// /api/user/create
router.post(
    "/create",
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un email válido').isEmail(),
        check('password', 'La clave debe ser mínimo de 6 caracteres').isLength({ min: 6})
    ],
    controller.createUser
);

module.exports = router;