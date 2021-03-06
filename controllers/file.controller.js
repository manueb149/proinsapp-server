const uploadFile = require("../middleware/upload");
const File = require('../models/file.model');
const Data = require('../models/fileData.model');
const fs = require('fs');

// Controller to upload files
exports.uploadFile = async (req, res) => {
    try {
        await uploadFile(req, res);
        const fileName = req.file.originalname;

        if (req.file === undefined) {
            return res.status(400).json({ message: "Porfavor, carge un archivo!" });
        }

        let file = await File.findOne({ name: fileName });
        if(file){
            return res.status(500).json({ message: "El archivo ya existe." })
        }
        file = new File({
            name: fileName
        });
        await file.save();

        res.status(200).json({
            message: "Se ha cargado el archivo: " + fileName,
            file
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

exports.getFiles = async (req, res) => {
    try {
        let files = await File.find();
        if(!files){
            return res.status(500).json({ message: "No hay archivos cargados."});
        }
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener los archivos, intentelo nuevamente." });
    }
};

exports.deleteFile = async (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const id = req.params.id;
    try {
        let file = await File.findById(id);
        if(!file){
            return res.status(404).json({ message: 'Archivo no encontrado.'})
        }
        fs.unlink(directoryPath + file.name, async function(err){
            // if(err) return res.status(500).json({ message: `No se pudo borrar el archivo, intentelo nuevamente. ${err}` });
            await File.findOneAndRemove({ _id: id });
            const del = await Data.deleteMany({ idArchivo: id })
            return res.status(200).json({
                message: `Archivo ${file.name} y ${del.deletedCount} registros eliminados`,
                file
            });
        }); 
    } catch (error) {
        res.status(500).json({ message: "No se borrar el archivo, intentelo nuevamente." });
    }
}