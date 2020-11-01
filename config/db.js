require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = () => {
    //DB Connection
    mongoose.connect(process.env.DB_URL,
        {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: true
        });
    const connection = mongoose.connection;
    
    connection.once('open', () => {
        console.log('DB Connected');
    }).catch(err => {
        console.log('Connection Failed!!');
    });
}

module.exports = connectDB;