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
        default: Date.now()
    }
});

module.exports = mongoose.model('TruckArea', TruckAreaSchema);