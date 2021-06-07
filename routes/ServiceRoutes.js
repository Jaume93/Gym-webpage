const express = require('express');
const Service = require('../models/Service');
const ServiceRouter = express.Router();
const mongoose = require('mongoose');
const MembershipFee = require('../models/MembershipFee');

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

//Crear servicio
ServiceRouter.post('/', async (req, res, next) => {
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

    try {
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


//Modificar Servicio
ServiceRouter.put('/:id', async (req, res, next) => {
    try {
        let { id } = req.params;
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
ServiceRouter.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
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