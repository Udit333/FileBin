const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../model/file');
const { v4: uuid4 } = require('uuid');

//Configure Multer
let storage = multer.diskStorage({
    destination: (req, file, callback) => callback(null, 'uploads/'),
    filename: (req, file, callback) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        callback(null, uniqueName);
    }
});


let upload = multer({
    storage: storage,
    limit: { fileSize: 1000000 * 20 },
}).single('myfile');


router.post('/', (req, res) => {
    
    //Store File
    upload(req, res, async (err) => {
        //Validate request
        if (!req.file) {
            return res.render('index',{ error: 'File not added!!' });
        }

        if (err) {
            return res.status(500).send({ error: err.message });
        }

        //Store in DB
        const file = new File({
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();
        return res.render('index',{ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });

    });
    

    //Respond with download Link
});


module.exports = router;