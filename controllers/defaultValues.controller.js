const DefaultValues = require('../models/defaultValues.model');

// Controller to get all values
exports.getValues = async (req, res) => {
    try {
        const defaultValues = await DefaultValues.findOne({ name: 'values' });
        res.status(200).send({ values: defaultValues.values });
    } catch (error) {
        res.status(500).json({ message: "No se pudo obtener los archivos, intentelo nuevamente." });
    }
};

// Controller to upload values
exports.uploadValues = async (req, res) => {
    const { values } = req.body; 
    try {
        let defaultValues = await DefaultValues.findOne({ name: 'values' });
        if(defaultValues){
            defaultValues.values = values;
           await defaultValues.save();
        }else{
            defaultValues = new DefaultValues({values})
            await defaultValues.save();
        }
        res.status(200).send({ message: "Datos guardados!" })
    } catch (err) {
        res.status(500).json({ message: `No se pudo obtener los archivos, intentelo nuevamente. ${err}` });
    }
};
