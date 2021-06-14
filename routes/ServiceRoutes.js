const express = require('express');
const Service = require('../models/Service');
const ServiceRouter = express.Router();
const mongoose = require('mongoose');
const MembershipFee = require('../models/MembershipFee');
const Member = require('../models/Member');
const { checkToken } = require('../middleware');

// Get all services
ServiceRouter.get('/', async (req, res, next) => {
    // Service.find({})
    //     .then(services => {
    //         return res.json({
    //             success: true,
    //             services
    //         })
    //     })
    try {
        let services = await Service.find({}).populate('membFee', 'name');
        return res.json({
            success: true,
            services
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

// Mostrar servicio por id
ServiceRouter.get('/find/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);

        return res.json({
            success: true,
            service
        })
    } catch (err) {
        return next({
            status: 403,
            message: err.message
        });
    }
});

//Crear servicio
ServiceRouter.post('/create', checkToken, async (req, res, next) => {
    try {
        const { id } = req.user;
        const { serviceName, description, membFee } = req.body;

        if (!serviceName || !description || !membFee) {
            return next({
                status: 403,
                message: 'fill the required information'
            })
        }

        let service = new Service({
            serviceName,
            description,
            membFee,
        });


        let newService = await service.save()
        return res.json({
            success: true,
            service: newService
        });
    }
    catch (err) {
        return next({
            status: 500,
            message: err.message
        });
    }
});

// Mostrar los servicios disponibles que tiene cada cliente con su cuota
ServiceRouter.get('/yourServices', checkToken, async (req, res, next) => {
    try {
        //cogemos el id del usuario que se ha registrado con el token
        const { id } = req.user;
        //encontramos al usuario por su id
        const user = await Member.findById(id);
        //encontramos la cuota que tiene el usuario 
        const membFeeUser = user.membFee;
        //De todos los servicios que hay, encuentra los servicios que tengan la misma cuota que tiene el usuario y muestra solo el nombre del servicio.
        const services = await Service.find({ membFee: membFeeUser })
            .select('serviceName');

        return res.json({
            success: true,
            services
        });
    } catch (err) {
        return next({
            status: 403,
            message: err.message
        });
    }
})

//Modificar Servicio
ServiceRouter.put('/modify/:id', checkToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { membId } = req.user.id;
        let { serviceName, description, membFee } = req.body;
        let service = await Service.findById(id);

        if (serviceName) {
            service.serviceName = serviceName;
        }
        if (description) {
            service.description = description;
        }
        if (membFee) {
            service.membFee = membFee;
        }
        let updatedService = await service.save();
        return res.json({
            success: true,
            service: updatedService
        })
    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

//Eliminar servicio
ServiceRouter.delete('/delete/:id', checkToken, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { membId } = req.user.id;
        let deleteService = await Service.findById(id);
        await deleteService.deleteOne();
        return res.status(200).send('Servicio borrado');

    } catch (err) {
        return next({
            status: 404,
            message: err.message
        });
    }
});

module.exports = ServiceRouter;