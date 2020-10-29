const mongoose = require('mongoose');
const db = 'mongodb+srv://admin:HhHNVEelfvvqKMkC@proinsapp0.qadjk.mongodb.net/proinsapp';

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('DB Connected 🚀');
    } catch (error) {
        console.log('Hubo un error al conectar la base de datos ⛔️')
        console.log(error);
        process.exit(1); // Stop App
    }
}

module.exports = connectDB;