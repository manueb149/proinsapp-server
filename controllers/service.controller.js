const Service = require('../models/service.model');

exports.getReports = async (req, res) => {
    try {
        const results = await Service.find();
        res.status(200).send({ message: 'Datos Obtenidos', results })
    } catch (error) {
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}

exports.createReport = async (req, res) => {
    try {
        const { data, dataTrucks, detailSinister, detailSinisterCk, servicesType, servicesTypeCk } = req.body;

        const newService = new Service({
            poliza: data.poliza,
            cedula: data.cedula,
            asegurado: data.asegurado,
            telAseg1: data.telAseg1,
            telAseg2: data.telAseg2,
            marca: data.marca,
            modelo: data.modelo,
            anio: data.anio,
            chassis: data.chassis,
            placa: data.placa,
            tipoVehiculo: data.tipoV,
            color: data.color,
            aseguradora: data.aseguradora,
            plan: data.plan,
            infoSin: data.infoSin,
            estadoV: data.estadoV,
            ubicacion: data.ubicacion,
            destino: data.destino,
            comentarioGruero: data.comentarioGruero,
            dia: data.dia,
            noche: data.noche,
            tiempoGrua: data.tiempoGrua,
            tiempoCliente: data.tiempoCliente,
            distancia: data.distancia,
            precio: data.precio,
            tarifaEspecial: data.tarifaEspecial,
            datosGruero: dataTrucks[0],
            detalleSiniestro: { detailSinister, detailSinisterCk },
            tipoServicios: { servicesType, servicesTypeCk },
            fechaSiniestro: data.fechaSiniestro,
            registry: data.registry,
            user: data.user

        });

        await newService.save();

        res.status(200).send({ message: `Servicio guardado!`, newService });
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente. ${error}` });
    }
}

exports.deleteReport = async (req, res) => {
    const serviceNo = req.params.serviceNo
    try {
        // Si la tarea existe o no
        let service = await Service.findOne({ serviceNo })

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        // Eliminar
        await Service.findOneAndRemove({ serviceNo });
        res.status(200).send({ message: 'Servicio Eliminado' })

    } catch (error) {
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}

exports.updateReport = async (req, res) => {
    const serviceNo = req.params.serviceNo
    const { data } = req.body;
    try {
        let service = await Service.findOne({ serviceNo })

        if (!service) {
            return res.status(404).json({ message: 'Servicio no encontrado' });
        }

        const updatedService = {
            color: data.color,
            telAseg1: data.telAseg1,
            telAseg2: data.telAseg2,
            infoSin: data.infoSin,
            estadoV: data.estadoV,
            ubicacion: data.ubicacion,
            destino: data.destino,
            fechaSiniestro: data.fechaSiniestro,
            datosGruero: data.datosGruero,
            comentarioGruero: data.comentarioGruero,
            tipoServicios: data.tipoServicios,
            detalleSiniestro: data.detalleSiniestro,
            dia: data.dia,
            noche: data.noche,
            tiempoGrua: data.tiempoGrua,
            tiempoCliente: data.tiempoCliente,
            distancia: data.distancia,
            precio: data.precio,
            tarifaEspecial: data.tarifaEspecial
        }

        service = await Service.findOneAndUpdate({ serviceNo }, updatedService, { new: true })

        res.status(200).send({ message: 'Servicio Actualizado!' });
    } catch (error) {
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}