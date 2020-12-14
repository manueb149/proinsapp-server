const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");

const FileSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    status: {
        type: Boolean,
        default: false
    },
    registry: {
        type: String,
        default: dateSD.toLocaleString()
    }
});

module.exports = mongoose.model('File', FileSchema);