const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: Number,
        type: String
    },
    membFee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipFee'
    }
});

module.exports = mongoose.model('Member', MemberSchema);