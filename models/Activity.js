const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activityName: {
        type: String
    },
    type: {
        type: String
    },
    membFee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipFee'
    },
    duration: Number,
    startTime: Date,
    location: String,
    maxCapacity: Number,
    partakers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member'
    }]
});

module.exports = mongoose.model('Activity', ActivitySchema);