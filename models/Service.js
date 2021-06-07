const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    serviceName: {
        type: String
    },
    description: {
        type: String,
    },
    membFee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipFee'
    }
});

module.exports = mongoose.model('Service', ServiceSchema);