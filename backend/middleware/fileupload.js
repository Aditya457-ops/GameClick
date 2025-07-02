const multer = require('multer');
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary')  ;

const storage = new CloudinaryStorage ({
    cloudinary: cloudinary,
    params: {
        folder: 'gameclick',
        allowed_formats: ['jpg', 'jpeg', 'png']
    }
})

const fileupload = multer({storage, limits: {fileSize: 2*1024*1024}});

module.exports = fileupload;