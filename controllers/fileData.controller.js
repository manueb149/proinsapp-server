const Data = require('../models/fileData.model');
const File = require('../models/file.model');
const xlsx = require('node-xlsx').default;
const fs = require('fs');

exports.getOneFromData = async (req, res) => {
    const { id, type } = req.params;
    try {
        const result = await Data.find({ [type]: id })
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
            return res.status(500).send({ message: "Archivo no encontrado, favor verificar que está cargado o eliminar el actual y volver a cargarlo." });
        }
        const ws = xlsx.parse(`${directoryPath}/${file.name}`);
        const s0 = ws[0];
        const doc = [];
        const doc2 = [];
        let count = 0;
        if (aseguradora.toUpperCase().trim() === 'FIHOGAR') {
            const s1 = ws[1]
            for (let i = 2; i < s0.data.length; i++) {
                if (s0.data[i][1]) {
                    count++;
                    doc.push({
                        poliza: '-',
                        cedula: String(s0.data[i][2] || '-').replace(/\-/g, ""),
                        asegurado: String(s0.data[i][1] || '-'),
                        marca: String(s0.data[i][8] || '-'),
                        modelo: String(s0.data[i][9] || '-'),
                        anio: String(s0.data[i][10] || '-'),
                        chassis: String(s0.data[i][7] || '-'),
                        placa: '-',
                        tipoVehiculo: '-',
                        aseguradora,
                        plan: String(s0.data[i][5] || '-'),
                        color: "",
                        idArchivo: file.id
                    });
                }
            }
        } else if (aseguradora.toUpperCase().trim() === 'LA INTERNACIONAL') {
            for (let i = 5; i < s0.data.length; i++) {
                if (s0.data[i][1]) {
                    count++;
                    doc.push({
                        poliza: String(s0.data[i][0] || '-'),
                        cedula: "-",
                        asegurado: String(s0.data[i][1] || '-'),
                        marca: String(s0.data[i][4] || '-'),
                        modelo: String(s0.data[i][5] || '-'),
                        anio: String(s0.data[i][6] || '-'),
                        chassis: String(s0.data[i][7] || '-'),
                        placa: String(s0.data[i][8] || '-'),
                        tipoVehiculo: String(s0.data[i][9] || '-'),
                        aseguradora,
                        plan,
                        color: "",
                        idArchivo: file.id
                    });
                }
            }
        } else {
            return res.status(500).send({
                message: `Favor revisar el formato del nombre del archivo.`
            });
        }

        await Data.insertMany(doc, { ordered: false })
            .then(result => {
                return res.status(200).send({
                    message: `Se han cargado ${count} registros correctamente.`,
                    doc,
                    len: doc.length,
                    s0,
                    len2: s0.data.length,
                    fileData
                });
            })
            .catch(err => {
                return res.status(400).send({
                    message: `Algo está mal con el archivo, intente cargar los registros nuevamente. ${err}`
                });
            })
        file.status = true;
        await file.save();

    } catch (error) {
        res.status(500).json({ message: `Hubo inconvenientes para realizar su petición, Intentelo nuevamente.` });
    }
}