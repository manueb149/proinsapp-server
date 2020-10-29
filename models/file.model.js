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
        default: Date.now()
    }
});

module.exports = mongoose.model('File', FileSchema);