const express = require('express');
const MembershipFee = require('../models/MembershipFee');
const MembershipFeeRouter = express.Router();
const mongoose = require('mongoose');
const { checkToken, authRole } = require('../middleware');

//Get all Fees
MembershipFeeRouter.get('/', async (req, res, next) => {
    // MembershipFee.find({})
    //     .then(membershipFees => {
    //         return res.json({
    //             success: true,
    //             membershipFees
    //         })
    //     })
    try {
        let membershipFees = await MembershipFee.find({});
        return res.json({
            success: true,
            membershipFees
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Get Fee By ID
MembershipFeeRouter.get('/find/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let membFee = await MembershipFee.findById(id)

        return res.json({
            success: true,
            membFee
        });
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        })
    }
});

//Create Fee
MembershipFeeRouter.post('/create', checkToken, authRole, async (req, res, next) => {
    try {
        const { name, pvp, description } = req.body;
        const { id } = req.user;

        if (!name || !pvp || !description) {
            return next({
                status: 403,
                message: 'Fill the required information'
            })
        }

        let membershipFee = new MembershipFee({
            name,
            pvp,
            description
        })

        let newMembershipFee = await membershipFee.save();
        return res.json({
            success: true,
            membershipFee: newMembershipFee
        })

    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});
//Actualizar Quota
MembershipFeeRouter.put('/modify/:id', checkToken, authRole, async (req, res, next) => {
    try {
        const { membId } = req.user.id;
        const { id } = req.params;
        // let id = req.params.id;
        const { name, pvp, description } = req.body;
        const fee = await MembershipFee.findById(id);

        if (name) {
            fee.name = name;
        }
        if (pvp) {
            fee.pvp = pvp;
        }
        if (description) {
            fee.description = description;
        }

        const updatedFee = await fee.save();
        return res.json({
            success: true,
            fee: updatedFee
        })

    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

//Delete Fee
MembershipFeeRouter.delete('/delete/:id', checkToken, authRole, async (req, res, next) => {

    try {
        const { id } = req.params;
        const { membId } = req.user.id;
        let deleteMembFee = await MembershipFee.findById(id);
        await deleteMembFee.deleteOne();
        return res.status(200).send('Quota borrada');

    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

module.exports = MembershipFeeRouter;