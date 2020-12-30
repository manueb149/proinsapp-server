const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");
const Float = require('mongoose-float').loadType(mongoose);

const ServiceSchema =  mongoose.Schema({
    serviceNo: Number,
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
    telAseg1: {
        type: String,
        trim: true,
        default: "",
        uppercase: true
    },
    telAseg2: {
        type: String,
        trim: true,
        default: "",
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
    infoSin: {
        type: String,
        trim: true,
        uppercase: true
    },
    estadoV: {
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
    noche: {
        type: Boolean,
        default: false
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
        type: Float,
        required: true,
        trim: true,
        uppercase: true
    },
    tarifaEspecial: {
        type: Float,
        default: 0
    },
    datosGruero: {
        type: Object,
        default: {}
    },
    tipoServicios: {
        type: Object,
        default: {}
    },
    detalleSiniestro: {
        type: Object,
        default: {}
    },
    fechaSiniestro: {
        type: Object,
        default: {}
    },
    user: {
        type: String,
        trim: true,
        required: true,
        uppercase: true
    },
    registry: {
        type: String,
        default: dateSD.toLocaleString('es-DO', { timeZone: 'UTC' })
    }
});
ServiceSchema.plugin(AutoIncrement, {inc_field: 'serviceNo', start_seq: 1000000});
module.exports = mongoose.model('Service', ServiceSchema);