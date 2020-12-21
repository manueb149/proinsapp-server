const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    // revisar si hay errores
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    // extraer email y password
    const { email, password } = req.body;


    try {
        // Revisar que el usuario registrado sea unico
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({ text: 'El usuario ya existe' });

        // crea el nuevo usuario
        user = new User(req.body);

        // Hashear el password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // guardar usuario
        await user.save();

        // Crear y firmar el JWT
        // const payload = {
        //     user: {
        //         id: user.id
        //     }
        // };

        // firmar el JWT
        // jwt.sign(payload, process.env.SECRETA, {
        // jwt.sign(payload, 'A1S2d#f4G5H6', {
        //     expiresIn: 3600 // 1 hora
        // }, (error, token) => {
        //     if (error) throw error;

        //     // Mensaje de confirmación
        //     res.json({ token });
        // });
        res.status(200).send({ text: 'Usuario creado correctamente' });
    } catch (error) {
        console.log(error);
        res.status(500).send({ text: 'Hubo un error' });
    }
}