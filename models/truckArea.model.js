const mongoose = require('mongoose');

const TruckAreaSchema =  mongoose.Schema({
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