const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");

const TruckAreaSchema =  mongoose.Schema({
    name: {
        type: String,
        default: "areas"
    },
    areas: {
        type: [],
        required: true,
        default: []
    },
    registry: {
        type: String,
        default: dateSD.toLocaleString()
    }
});

module.exports = mongoose.model('TruckArea', TruckAreaSchema);