const router = require('express').Router();
const File = require('../model/file');
const fs = require('fs');


router.get('/:uuid', async (req, res) => {
    try {
        const file = await File.findOne({
        uuid: req.params.uuid
        });
        if (!file) {
            return res.render('download', {
                error: 'Link Expired !!'
            });
        }

        const filePath = `${__dirname}/../${file.path}`;

        //Download and Delete from uploads and DB
        res.download(filePath, async () => {
            fs.unlinkSync(file.path);
            await file.remove();
            console.log("File Deleted successfully !!")
        });
        console.log("File downloaded Successfully !!")
        
    } catch (error) {
        return res.send({ error:' File Not Found !!'})
    }
    
});

module.exports = router;