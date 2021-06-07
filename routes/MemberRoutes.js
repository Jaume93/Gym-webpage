const express = require('express');
const Member = require('../models/Member');
const MemberRouter = express.Router();
const mongoose = require('mongoose');
const { response } = require('express');

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

MemberRouter.post('/', async (req, res, next) => {
    const { name, lastName, email, password, membFee } = req.body;

    if (!name || !lastName || !email || !password || !membFee) {
        return next({
            status: 403,
            message: 'fill the required information'
        })
    }

    let member = new Member({
        name,
        lastName,
        email,
        password,
        membFee
    });

    try {
        let newMember = await member.save();
        return res.json({
            success: true,
            newMember
        })
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Modificar usuario
MemberRouter.put('/id:', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, password, membFee } = req.body;
        const member = await Member.findById(id);
        console.log(member)

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