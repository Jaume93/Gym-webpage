const express = require('express');
const Activity = require('../models/Activity');
const ActivityRouter = express.Router();
// const MembershipFee = require('../models/MembershipFee')
const mongoose = require('mongoose');
const { db } = require('../models/Activity');
const MembershipFeeRouter = require('./MembershipFeeRoutes');

ActivityRouter.get('/', async (req, res) => {
    try {
        let activities = await Activity.find({}).select(['activityName', 'duration', 'startTime']);
        return res.json({
            success: true,
            activities
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

// ActivityRouter.get('/:id', (req, res) => {
//     const { id } = req.params;
//     Activity.findById(id)
//         .populate("partakers", ["name", "lastName"])
//         .exec((err, activity) => {
//             return res.json({
//                 success: true,
//                 activity
//             });
//         });
// });

//Get 1 Activity
ActivityRouter.get('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
        let activity = await Activity.findById(id)
            .populate('membFee', 'name')
            .populate('partakers', ['name', 'lastName']);
        return res.json({
            success: true,
            activity
        });
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        })
    }
});

ActivityRouter.post('/', async (req, res, next) => {
    const { activityName, type, membFee, duration, startTime, location, maxCapacity } = req.body;
    let activityTime = new Date()
    activityTime.setHours(parseFloat(startTime) + 2, 0, 0, 0)

    if (!activityName || !type || !membFee || !duration || !startTime || !location || !maxCapacity) {
        return next({
            status: 403,
            message: 'fill the required information'
        })
    }

    const activity = new Activity({
        activityName,
        type,
        membFee,
        duration,
        startTime: activityTime,
        location,
        maxCapacity,
        partakers: []
    })
    try {
        let newActivity = await activity.save();
        return res.json({
            success: true,
            activity: newActivity
        })
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

//Actualizar Actividad
ActivityRouter.put('/:id', async (req, res, next) => {
    try {
        let id = req.params.id;
        let { activityName, membFee, duration, startTime, maxCapacity } = req.body;
        let activity = await Activity.findById(id);

        if (activityName) {
            activity.activityName = activityName;
        }
        if (membFee) {
            activity.membFee = membFee;
        }
        if (duration) {
            activity.duration = duration;
        }
        if (startTime) {
            activity.startTime = startTime;
        }
        if (maxCapacity) {
            activity.maxCapacity = maxCapacity;
        }

        let updatedActivity = await activity.save();
        return res.json({
            success: true,
            activity: updatedActivity
        })

    } catch (err) {
        return next({
            status: 400,
            message: err.message
        });
    }
});

//Borrar Actividad
ActivityRouter.delete('/:id', async (req, res, next) => {

    try {
        const { id } = req.params;
        let deleteActivity = await Activity.findById(id);
        await deleteActivity.deleteOne();
        return res.status(200).send('Actividad borrada');
    }
    catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

module.exports = ActivityRouter;