const truckData = require('../models/truckData.model');
const truckArea = require('../models/truckArea.model');
const Truck = require('../models/truck.model');
const xlsx = require('node-xlsx').default;
const fs = require('fs');

exports.getAllData = async (req, res) => {
    try {
        let result;
        if(req.body.region){
            result = await truckData.find(req.body).exec();
        }else{
            result = await truckData.find();
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).json({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}

exports.getAreas = async (req, res) => {
    try {
        const truckAreas = await truckArea.findOne({ name: 'areas' });
        if(truckAreas){
           return res.status(200).send({ areas: truckAreas.areas }) 
        }else{
            return res.status(200).send({ areas: [] }) 
        }
    } catch (error) {
        
    }
}

exports.uploadData = async (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const { id } = req.body;
    try {
        let truck = await Truck.findById(id);
        if (!truck) {
            return res.status(500).send({ message: "Favor intentar otra vez." });
        }
        if (truck.status) {
            return res.status(500).send({ message: "Los registros de este archivo han sido cargados." });
        }
        if (!fs.existsSync(directoryPath + truck.name)) {
            return res.status(500).send({ message: "Archivo no encontrado, favor verificar que está cargado." });
        }
        const doc = [];
        const areas = []
        let count = 0;
        const wb = xlsx.parse(`${directoryPath}/${truck.name}`);
        for (let i = 0; i < wb.length; i++) {
            const wbData = wb[i].data;
            areas.push(String(wb[i].name).trim().toUpperCase());
            for (let j = 4; j < wbData.length; j++) {
                if (wbData[j].length > 0) {
                    if (wbData[j][0] === '*') {
                        j += 3;
                    } else if (wb[i].name.toUpperCase() === 'ASISTENCIAS') {
                        doc.push({
                            region: String(wb[i].name),
                            gruaDeServicio: String(wbData[j][2] || '-'),
                            area: String(wbData[j][1] || '-'),
                            telOficina: String(wbData[j][3] || '-') ,
                            telCelular: '-',
                            gruero: '-',
                            direccion: '-',
                            alcance: String(wbData[j][0] || '-'),
                            contacto: '-',
                            transferencia: '-',
                            banco: '-',
                            tipoCuenta: '-',
                            numeroCuenta: '-',
                            nombreCuenta: '-',
                            cedula: '-',
                            fechaNacimiento: '-',
                            trasporteGrua: '-',
                            idArchivo: truck.id
                        });
                        count++;
                    } else {
                        doc.push({
                            region: wb[i].name,
                            gruaDeServicio: String(wbData[j][0] || '-'),
                            area: String(wbData[j][1] || '-'),
                            telOficina: String(wbData[j][2] || '-'),
                            telCelular: String(wbData[j][3] || '-'),
                            gruero: String(wbData[j][4] || '-'),
                            direccion: String(wbData[j][5] || '-'),
                            alcance: String(wbData[j][6] || '-'),
                            contacto: String(wbData[j][7] || '-'),
                            transferencia: String(wbData[j][8] || '-'),
                            banco: String(wbData[j][9] || '-'),
                            tipoCuenta: String(wbData[j][10] || '-'),
                            numeroCuenta: String(wbData[j][11] || '-'),
                            nombreCuenta: String(wbData[j][12] || '-'),
                            cedula: String(wbData[j][13] || '-'),
                            fechaNacimiento: String(wbData[j][14] || '-'),
                            trasporteGrua: String(wbData[j][15] || '-'),
                            idArchivo: truck.id
                        });
                        count++;
                    }
                }
            }
        }
        if (doc.length > 0) {
            await truckData.insertMany(doc, { ordered: false })
            .then(result => {})
            .catch( err => {
                return res.status(400).send({
                    message: `Algo está mal con el archivo, intente cargar los registros nuevamente.`
                });
            })
            let truckAreas = await truckArea.findOne({ name: 'areas' });
            if(truckAreas){
               truckAreas.areas = areas;
               await truckAreas.save();
            }else{
                truckAreas = new truckArea({
                    areas: areas
                })
                await truckAreas.save();
            }
            truck.status = true;
            await truck.save();
            res.status(200).send({
                message: `Se han cargado ${count} registros correctamente.`
            });
        } else {
            return res.status(400).send({
                message: `Algo está mal con el archivo, intente cargar los registros nuevamente.`
            });
        }
    } catch (error) {
        res.status(500).json({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}