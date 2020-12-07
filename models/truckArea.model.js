const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");
const mongoose = require('mongoose');

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
        type: Date,
        default: dateSD
    }
});

module.exports = mongoose.model('TruckArea', TruckAreaSchema);