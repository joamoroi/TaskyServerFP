const config = require('../config');

//Multer
const multer = require('multer');
const {model} = require('mongoose');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {      
        // cb(null, config.imageFolder)
        config.multer[file.fieldname](cb);
    },
    filename: function (req, file, cb) {
        const error = null
        cb(null, Date.now() + '.jpg')
    }
})

const uploads = multer({
    // dest: './src/statics/',
    storage: storage,
    limits: {
        fileSize: 5000000,
    },
});

module.exports = {
    uploads,
}