const mongoose = require('mongoose');

const MembershipFeeSchema = new mongoose.Schema({
    name: String,
    pvp: Number,
    description: String
});

module.exports = mongoose.model('MembershipFee', MembershipFeeSchema);