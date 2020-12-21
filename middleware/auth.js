const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if (!token) {
        return res.status(401).json({ text: 'No hay Token, permiso no válido' })
    }

    // validar el token
    try {
        const cipher = jwt.verify(token, 'A1S2d#f4G5H6');
        req.user = cipher.user;
        next();
    } catch (error) {
        res.status(500).send({ text: 'TNV' });
    }
}