const uploadFile = require("../middleware/upload");
const xlsx = require('node-xlsx').default;
const fs = require('fs');

exports.upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Porfavor, carge un archivo!" });
        }
        console.log(req.file);
        res.status(200).send({
            message: "Se ha cargado el archivo: " + req.file.originalname
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "El tamaño del archivo debe ser menor a 2MB!"
            });
        }
        res.status(500).send({
            message: `No se pudo subir el archivo: ${req.file.originalname}. ${err}`
        });
    }
};

exports.getListFiles = (req, res) => {

    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const baseUrl = "https://young-retreat-94433.herokuapp.com/"

    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!"
            });
        }

        let fileInfos = [];

        files.forEach((file) => {
            fileInfos.push({
                name: file,
                url: baseUrl + file,
            });
        });

        return res.status(200).send(fileInfos);
    });
};

exports.download = (req, res) => {

    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/uploads/";

    console.log(directoryPath + fileName);

    try {
        fs.unlinkSync(directoryPath + fileName)
        res.status(200).json({
            message: `El archivo ${fileName} ha sido borrado!`
        })
        //file removed
    } catch (err) {
        if (err) {
            res.status(500).send({
                message: "No se pudo eliminar al archivo"
            });
        }
    }

    // res.download(directoryPath + fileName, fileName, (err) => {
    //     if (err) {
    //         res.status(500).send({
    //             message: "Could not download the file. " + err,
    //         });
    //     }
    // });
};

exports.poliza = (req, res) => {
    const directoryPath = __basedir + "/resources/static/assets/uploads/";
    const id = req.params.id
    try {
        // Parse a file
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory');
            }
            //listing all files using forEach
            files.forEach(function (file) {
                // Do whatever you want to do with the file
                const ws = xlsx.parse(`${directoryPath}/${file}`);
                const index = ws[0].data.findIndex(arr => arr.includes(id));
                return res.status(200).json(ws[0].data[index]);
            });
        });
    } catch (error) {

    }
}