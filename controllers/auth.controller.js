const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    // revisar si hay errores
    // const errors = validationResult(req);
    // if (!errores.isEmpty()) {
    //     return res.status(400).send({ errors: errors.array() })
    // }

    // extraer el email y password
    const { email, password } = req.body;

    try {
        // Revisar que sea un user registrado
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ text: 'El usuario no existe' });

        // Revisar el password
        const correctPass = await bcryptjs.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({ 
                text: 'Clave Incorrecta',
                severity: 'error'
            })
        }

        // Si todo es correcto Crear y firmar el JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // firmar el JWT
        // jwt.sign(payload, process.env.SECRETA, {
        jwt.sign(payload, 'A1S2d#f4G5H6', {
            expiresIn: 3600// 1 hora
        }, (error, token) => {
            if (error) throw error;

            // Mensaje de confirmación
            return res.status(200).send({ token });
        });

    } catch (error) {
        res.status(500).send({ text: 'Hubo un error authenticateUser' });
    }
}

// Obtiene el usario que está autenticado
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).send({ user });
    } catch (error) {
        res.status(500).send({ text: 'Hubo un error userAuthenticated' });
    }
}