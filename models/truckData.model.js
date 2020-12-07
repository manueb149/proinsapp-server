const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");
const mongoose = require('mongoose');

const TruckDataSchema = mongoose.Schema({
    region: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    gruaDeServicio: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    area: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    telOficina: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    telCelular: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    gruero: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    alcance: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    contacto: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    transferencia: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    banco: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    tipoCuenta: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    numeroCuenta: {
        type: String,
        required: true,
        trim: true,
    },
    nombreCuenta: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    cedula: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    fechaNacimiento: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    registry: {
        type: Date,
        default: dateSD
    },
    idArchivo: {
        type: String,
        required: true,
        trim: true,
    }

});

module.exports = mongoose.model('TruckData', TruckDataSchema)