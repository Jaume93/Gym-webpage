const express = require('express');
const Activity = require('../models/Activity');
const ActivityRouter = express.Router();
const Member = require('../models/Member');
const { checkToken, authRole } = require('../middleware');

// Actualizar a 0 los partakers de las actividades cuando acaba el dia 
ActivityRouter.put('/resetPartakers', async (req, res, next) => {
    try {
        const activities = await Activity.find({});
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 2);

        for (let activity of activities) {
            if (activity.startTime.getTime() < currentTime.getTime()) {
                activity.partakers = [];
                activity.startTime = new Date(activity.startTime).setDate(currentTime.getDate() + 1);
                await activity.save()
            }
        }
        return res.json({
            success: true,
            activities,
            message: 'Activities updated in partakers and date'
        })

    } catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});


// Get all activities
ActivityRouter.get('/', async (req, res, next) => {
    try {
        const activities = await Activity.find({})
            .select(['activityName', 'duration', 'startTime']);
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

//Get 1 Activity by his id
ActivityRouter.get('/find/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        let activity = await Activity.findById(id)
            .populate('membFee', 'name')
            .select('-partakers');
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

//Mostar las actividades que tenga cada cuota a los usuarios con esa misma cuota
ActivityRouter.get('/yourActivities', checkToken, async (req, res, next) => {
    try {
        //cogemos el id del usuario que se ha registrado con el token
        const { id } = req.user;

        //encontramos al usuario por su id
        const user = await Member.findById(id);

        //encontramos la cuota que tiene el usuario 
        const membFeeUser = user.membFee;
        //De todas las actividades que hay, encuentra la actividad que tenga la misma cuota que tiene el usuario.
        const activities = await Activity.find({ membFee: membFeeUser })
            .select('-partakers')
            .select('-membFee');
        // console.log(activities);

        // console.log(membFeeUser);

        return res.json({
            success: true,
            activities
        });

    } catch (err) {
        console.log(err)
        return next({
            status: 403,
            message: err.message
        });
    }
});

//Crear actividad
ActivityRouter.post('/create', checkToken, authRole, async (req, res, next) => {
    try {
        const { id } = req.user;
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
ActivityRouter.put('/modify/:id', checkToken, authRole, async (req, res, next) => {
    try {
        const id = req.params.id;
        const { membId } = req.user.id;
        const { activityName, membFee, duration, startTime, maxCapacity } = req.body;

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
ActivityRouter.delete('/delete/:id', checkToken, authRole, async (req, res, next) => {

    try {
        const { id } = req.params;
        const { MembId } = req.user.id;
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

//Apuntarse a una actividad
ActivityRouter.put('/:id/signupActivity', checkToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const memberId = req.user.id;
        let activity = await Activity.findById(id);
        let user = await Member.findById(memberId);

        // Mirar si el usuario existe
        if (!user) {
            return next({
                status: 404,
                message: 'El usuario no existe'
            })
        }

        // Mirar si la actividad existe
        if (!activity) {
            return next({
                status: 404,
                message: 'Esta actividad no existe'
            })
        }

        //Comprobar si la cuota permite apuntarse a la actividad
        const userFee = user.membFee;
        const activityFees = activity.membFee;

        // Si la cuota del miembro no se encuentra en la array de cuotas de la actividad, devuelve error.
        if (activityFees.indexOf(userFee) == -1) {
            return next({
                status: 403,
                message: 'This activity is not for your Membership Fee'
            })
        }

        //Si la hora de la clase ya se ha iniciado. No se puede apuntar.
        const activities = await Activity.find({});
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 2);

        for (let activity of activities) {
            if (activity.startTime.getTime() > currentTime.getTime()) {
                return next({
                    status: 403,
                    message: 'This activity has started'
                });
            }
        }

        // Comprobar si el usuario ya esta apuntado a la actividad. si la la id del miembro esta ya dentro de la array de partakers dentro de la actividad
        let isInArray = activity.partakers.some(member => {
            if (memberId == member) {
                return true
            }
            return false
        });

        //condicion no te puedes apuntar 2 veces a la misma actividad
        if (isInArray) {
            return next({
                status: 404,
                message: 'Ya estas inscrito a esta actividad'
            })
        }
        // el usuario se apunta a la actividad. se hace push del id del miembro a la array de partakers dentro de la actividad
        // si la actividad ya tiene el aforo al maximimo no se puede apuntar nadie mas
        let partaker = activity.partakers
        if (partaker.length >= activity.maxCapacity) {
            return next({
                status: 404,
                message: 'Las plazas para esta actividad estan completas'
            })
        };
        partaker.push(memberId);

        let updatedActivity = await activity.save()

        return res.json({
            success: true,
            activity: updatedActivity,
            message: 'Te has apuntado correctamente a la clase ${activity}'
        })
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        })
    }
});

// Borrar un usuario de una actividad
ActivityRouter.put('/:id/dropOutActivity', checkToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const memberId = req.user.id;
        let activity = await Activity.findById(id);
        let user = await Member.findById(memberId);

        // Comprobar si el usuario existe
        if (!user) {
            return next({
                status: 404,
                message: 'El usuario no existe'
            })
        }

        // Comprobar si la actividad existe
        if (!activity) {
            return next({
                status: 404,
                message: 'Esta actividad no existe'
            })
        }

        // Comprobar si el usuario ya esta apuntado a la actividad. si la la id del miembro esta ya dentro de la array de partakers dentro de la actividad
        let isInArray = activity.partakers.some(member => {
            if (memberId == member) {
                return true
            }
            return false
        });

        //condicion si esta en la array de partaker en la actividad, Borralo de la actividad.
        if (isInArray) {
            let index = activity.partakers.findIndex(partaker => partaker == memberId)
            if (index > -1)
                activity.partakers.splice(index, 1);
        }

        let updatedActivity = await activity.save()
        return res.json({
            success: true,
            activity: updatedActivity,
            message: 'Borrado de la actividad'
        })
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        })
    }
});

module.exports = ActivityRouter;