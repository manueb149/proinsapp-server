const mongoose = require('mongoose');
const moment = require('moment-timezone');
const dateSD = moment.tz(Date.now(), "America/Santo_Domingo");

const DefaultValuesSchema = mongoose.Schema({
    name: {
        type: String,
        default: "values"
    },
    values: {
        TG: {
            type: String,
            required: true,
            default: 0
        },
        EX: {
            type: String,
            required: true,
            default: 0
        },
        CR: {
            type: String,
            required: true,
            default: 0
        },
        CG: {
            type: String,
            required: true,
            default: 0
        },
        CE: {
            type: String,
            required: true,
            default: 0
        },
        PE: {
            type: String,
            required: true,
            default: 0
        },
        SP: {
            type: String,
            required: true,
            default: 0
        },
        SG: {
            type: String,
            required: true,
            default: 0
        },
        CE: {
            type: String,
            required: true,
            default: 0
        },
        LM: {
            type: String,
            required: true,
            default: 0
        },
        VO: {
            type: String,
            required: true,
            default: 0
        },
        IN: {
            type: String,
            required: true,
            default: 0
        },
        CO: {
            type: String,
            required: true,
            default: 0
        },
        DM: {
            type: String,
            required: true,
            default: 0
        }
    },
    registry: {
        type: String,
        default: dateSD.toLocaleString()
    }
});

module.exports = mongoose.model('Value', DefaultValuesSchema);