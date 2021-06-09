const express = require('express');
const Member = require('../models/Member');
const MemberRouter = express.Router();
const mongoose = require('mongoose');
const { response } = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

MemberRouter.get('/', async (req, res, next) => {
    // Member.find({})
    //     .then(members => {
    //         return res.json({
    //             success: true,
    //             members
    //         })
    //     })

    try {
        let members = await Member.find({}).populate('membFee', 'name');
        return res.json({
            success: true,
            members
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Sign in member
MemberRouter.post('/signin', async (req, res, next) => {
    try {
        const { name, lastName, email, password, membFee } = req.body;
        const user = await Member.findOne({ email });

        if (!name || !lastName || !email || !password || !membFee) {
            return next({
                status: 403,
                message: 'fill the required information'
            });
        }

        if (user) {
            return next({
                status: 403,
                message: 'This email already exists'
            });
        }

        if (password.length < 6) {
            return next({
                status: 403,
                message: 'Pasword is too short'
            });
        }

        let member = new Member({
            name,
            lastName,
            email,
            password,
            membFee
        });

        let newMember = await member.save();
        return res.json({
            success: true,
            newMember
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Login of member
MemberRouter.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const user = await Member.findOne({ email });

    if (!user) {
        return next({
            status: 403,
            message: 'Wrong Credentials (email)'
        });
    }

    //La password que creó usuario sin encriptar, se compara con la que esta encriptada y si corresponde igual, da acceso al Log in
    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return next({
            status: 403,
            message: 'Wrong Credentials (password)'
        });
    }

    //creamos un token para el usuario que lo buscamos por el id y tendra acceso durante 24h
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24h" });

    return res.json({
        success: true,
        token
    });
})

//Modificar usuario
MemberRouter.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, password, membFee } = req.body;
        const member = await Member.findById(id);

        if (email) {
            member.email = email;
        }
        if (password) {
            member.password = password;
        }
        if (membFee) {
            member.membFee = membFee;
        }

        let updatedMember = await member.save();
        return res.json({
            success: true,
            member: updatedMember
        })
        return res.status(200).send('Has actualizado los datos correctamente')

    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

//Eliminar Socio
MemberRouter.delete('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        const deleteMember = await Member.findById(id);
        await deleteMember.deleteOne();
        return res.status(200).send('Socio dado de Baja')
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        })
    }
});

module.exports = MemberRouter;