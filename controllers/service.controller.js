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
        const { data, dataTrucks, detailSinister, detailSinisterCk, servicesType, servicesTypeCk, selectedDate } = req.body;

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
            ubicacion: data.ubicacion,
            destino: data.destino,
            comentarioGruero: data.comentarioGruero,
            dia: data.dia,
            noche: data.noche,
            tiempoGrua: data.tiempoGrua,
            tiempoCliente: data.tiempoCliente,
            distancia: data.distancia,
            precio: data.precio,
            datosGruero: dataTrucks[0],
            detalleSiniestro: { detailSinister, detailSinisterCk },
            tipoServicios: { servicesType, servicesTypeCk },
            fechaSiniestro: selectedDate

        });

        await newService.save();

        res.status(200).send({ message: `Servicio guardado!`, newService });
    } catch (error) {
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente. ${error}` });
    }
}

exports.deleteReport = async (req, res) => {
    try {

    } catch (error) {

    }
}

exports.updateReport = async (req, res) => {
    try {

    } catch (error) {

    }
}