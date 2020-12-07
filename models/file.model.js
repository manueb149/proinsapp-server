const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");
const mongoose = require('mongoose');

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
        type: Date,
        default: dateSD
    }
});

module.exports = mongoose.model('File', FileSchema);