const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MemberSchema = new mongoose.Schema({
    name: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true

    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    membFee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MembershipFee',
        required: true
    },
    role: {
        type: Number,
        default: 0,
    }
});

//Encriptar la password. this = al Schema
MemberSchema.pre('save', function (next) {
    // si el usuario no es nuevo o la password no se ha modificado, sigue adelante...
    if (!this.isNew || !this.isModified('password')) {
        console.log(this.isModified)
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;

            next();
        });
    });
});


module.exports = mongoose.model('Member', MemberSchema);