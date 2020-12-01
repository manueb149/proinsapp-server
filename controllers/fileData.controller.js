const Data = require('../models/fileData.model');
const File = require('../models/file.model');
const xlsx = require('node-xlsx').default;
const fs = require('fs');

// exports.getAllData = async (req, res) => {

// }

exports.getOneFromData = async (req, res) => {
    const { id, type } = req.params;
    try {
        const result = await Data.findOne({ [type]: id })
        if (!result) {
            return res.status(400).send({ message: "El registro no ha sido encontrado" });
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }

}

exports.uploadData = async (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const { id } = req.body;
    try {
        const file = await File.findById(id);
        if (!file) {
            return res.status(500).send({ message: "Favor intentar otra vez." });
        }
        if (file.status) {
            return res.status(500).send({ message: "Los registros de este archivo ya han sido cargados." });
        }
        const fileData = file.name.split("_");
        const aseguradora = fileData[0].replace("-", " ");
        const plan = fileData[2].slice(0, -5).replace("-", " ");
        if (!fs.existsSync(directoryPath + file.name)) {
            return res.status(500).send({ message: "Archivo no encontrado, favor verificar que está cargado." });
        }
        const ws = xlsx.parse(`${directoryPath}/${file.name}`);
        const s0 = ws[0]
        const doc = [];
        let count = 0;
        for (let i = 5; i < s0.data.length; i++) {
            count++;
            doc.push({
                poliza: s0.data[i][0],
                asegurado: s0.data[i][1],
                marca: s0.data[i][4],
                modelo: s0.data[i][5],
                anio: s0.data[i][6],
                chassis: s0.data[i][7],
                placa: s0.data[i][8],
                tipoVehiculo: s0.data[i][9],
                aseguradora,
                plan,
                color: "",
                idArchivo: file.id
            });
        }
        if ((s0.data.length - 5) === count) {
            await Data.insertMany(doc,{ ordered: false })
            .then(result => {
                return res.status(200).send({
                    message: `Se han cargado ${count} registros correctamente.`
                });
            })
            .catch( err => {
                return res.status(400).send({
                    message: `Algo está mal con el archivo, intente cargar los registros nuevamente. ${err}`
                });
            })
            file.status = true;
            await file.save();
        } else {
            return res.status(500).send({
                message: `Intente cargar los registros nuevamente.`
            });
        }
    } catch (error) {
        res.status(500).json({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}