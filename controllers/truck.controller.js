const uploadFile = require("../middleware/upload");
const Truck = require('../models/truck.model');
// const Data = require('../models/data.model');
const fs = require('fs');

// Controller to upload files
exports.uploadTrucks = async (req, res) => {
    try {
        await uploadFile(req, res);
        const fileName = req.file.originalname;

        if (req.file === undefined) {
            return res.status(400).json({ message: "Porfavor, carge un archivo!" });
        }

        let file = await Truck.findOne({ name: fileName });
        if(file){
           return res.status(500).json({ message: "El archivo ya existe." })
        }
        truck = new Truck({
            name: fileName
        });
        await truck.save();

        res.status(200).json({
            message: "Se ha cargado el archivo: " + fileName,
            truck
        });

    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "El tamaño del archivo debe ser menor a 2MB!"
            });
        }
        res.status(500).send({
            message: `No se pudo subir el archivo: ${req.file.originalname} -> ${err}`
        });
    }
};

exports.getTrucks = async (req, res) => {
    try {
        let trucks = await Truck.find();
        if(!trucks){
            return res.status(500).json({ message: "No hay archivos cargados."});
        }
        res.status(200).json(trucks);
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener los archivos, intentelo nuevamente." });
    }
};

exports.deleteTruck = async (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const id = req.params.id;
    try {
        let truck = await Truck.findById(id);
        if(!truck){
            return res.status(404).json({ message: 'Archivo no encontrado.'})
        }
        fs.unlink(directoryPath + truck.name, async function(err){
            if(err) return res.status(500).json({ message: `No se pudo borrar el archivo, intentelo nuevamente. ${err}` });
            await Truck.findOneAndRemove({ _id: id });
            // const del = await Data.deleteMany({ idArchivo: id })
            return res.status(200).json({
                message: `Archivo ${truck.name} eliminado`,
                truck
            });
        }); 
    } catch (error) {
        res.status(500).json({ message: "No se pudo borrar el archivo, intentelo nuevamente." });
    }
}