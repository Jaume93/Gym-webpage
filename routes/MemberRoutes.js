const express = require('express');
const Member = require('../models/Member');
const MemberRouter = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const { checkToken, authRole } = require('../middleware');
const { findOne } = require('../models/Member');


// Get all members
MemberRouter.get('/', checkToken, authRole, async (req, res, next) => {
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

//Sign up member
MemberRouter.post('/signup', async (req, res, next) => {
    try {
        const { name, lastName, email, password, membFee } = req.body;
        const user = await Member.findOne({ email });
        const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

        if (!name || !lastName || !email || !password || !membFee) {
            return next({
                status: 403,
                message: 'fill the required information'
            });
        }

        if (!emailRegex.test(email)) {
            return next({
                status: 403,
                message: "Mail no valido"
            })
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
    //creamos un token para el usuario que lo buscamos por el id y tendra acceso durante 24dias
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "24d" });

    return res.json({
        success: true,
        token
    });
})

// Get info of Member Logged In
MemberRouter.get('/yourInfo', checkToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        let member = await Member.findById(id)
            .select('-password')
            .populate('membFee', ['name']);
        return res.json({
            success: true,
            member
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Modificar usuario
MemberRouter.put('/modifyAccount', checkToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        const { email, password, membFee } = req.body;
        const member = await Member.findById(id);
        const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;

        if (email) {
            if (email == member.email) {
                return next({
                    status: 403,
                    message: 'Please, enter a differtent email'
                });
            }
            if (!emailRegex.test(email)) {
                return next({
                    status: 403,
                    message: "Mail no valido"
                })
            }
            member.email = email;
        }

        if (password) {
            if (password.length < 6) {
                return next({
                    status: 403,
                    message: 'Password is too short'
                });
            }
            // Compara la password antigua desencriptada con la nueva desencriptada
            const samePassword = await bcrypt.compare(password, member.password);
            if (samePassword) {
                return next({
                    status: 403,
                    message: "Password cannot be the same as previous"
                });
            }
            member.password = password;
        }

        if (membFee) {
            if (membFee == member.membFee) {
                return next({
                    status: 403,
                    message: 'Please select a different Fee'
                });
            }
            member.membFee = membFee;
        }

        const salt = await bcrypt.genSalt(10);
        member.password = await bcrypt.hash(req.body.password, salt);

        let updatedMember = await member.save();
        return res.json({
            success: true,
            member: updatedMember,
            message: ('All changes have been updated')
        })
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

//Eliminar Socio
MemberRouter.delete('/removeAccount', checkToken, async (req, res, next) => {
    try {
        let { id } = req.user;
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

// Ruta para que el administrador pase a admin a un miembro
MemberRouter.post('/admin', checkToken, authRole, async (req, res, next) => {
    try {
        const { adminId } = req.user.id;
        const { id } = req.body;

        if (!id || id.length != 24) {
            return next({
                status: 403,
                message: 'Select a member ID'
            });
        }

        const member = await Member.findById(id);
        if (!member) {
            return next({
                status: 403,
                message: 'Wrong ID'
            });
        }

        if (member.role != 0) {
            return next({
                status: 403,
                message: 'This member is already admin'
            });
        } member.role = 1

        const updatedMember = await member.save();
        return res.json({
            success: true,
            member: updatedMember,
            message: 'Member is updated to Admin'
        });

    } catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

module.exports = MemberRouter;