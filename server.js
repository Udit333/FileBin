const express = require('express');
const app = express();
const path = require('path');

//Public folder
app.use(express.static('public'));

//DB Connection
const connectDB = require('./config/db');
connectDB();

//View Engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes
app.use('/', require('./routes/frontend'));
app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/displayLink'));
app.use('/files/download', require('./routes/download'));

//Server Listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});