const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");

const ServiceSchema =  mongoose.Schema({
    poliza: {
        type: String,
        trim: true,
        required: true,
    },
    cedula: {
        type: String,
        trim: true,
        uppercase: true
    },
    asegurado: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    marca: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    modelo: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    anio: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    chassis: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    placa: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    tipoVehiculo: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    aseguradora: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    plan: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    color: {
        type: String,
        trim: true,
        uppercase: true
    },
    ubicacion: {
        type: String,
        trim: true,
        uppercase: true
    },
    destino: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    comentarioGruero: {
        type: String,
        trim: true,
        uppercase: true
    },
    dia: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    tiempoGrua: {
        type: Number,
        required: true,
        trim: true,
        uppercase: true
    },
    tiempoCliente: {
        type: Number,
        required: true,
        trim: true,
        uppercase: true
    },
    distancia: {
        type: Number,
        required: true,
        trim: true,
        uppercase: true
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
        uppercase: true
    },
    datosGruero: {
        type: Object,
        default: {}
    },
    tipoServicios: {
        type: Object,
        default: {}
    },
    DetalleSiniestro: {
        type: Object,
        default: {}
    },
    registry: {
        type: String,
        default: dateSD.toLocaleString()
    }
});

module.exports = mongoose.model('Service', ServiceSchema);