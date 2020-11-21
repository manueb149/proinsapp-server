const mongoose = require('mongoose');

const FileDataSchema =  mongoose.Schema({
    poliza: {
        type: String,
        trim: true,
        required: true,
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
    registry: {
        type: Date,
        default: Date.now()
    },
    idArchivo: {
        type: String,
        required: true,
        trim: true,
    }
});

module.exports = mongoose.model('FileData', FileDataSchema);