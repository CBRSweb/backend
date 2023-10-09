const cloudinary = require('cloudinary');
const cloudinaryConfig = require('../_configs/cloudinary.config');

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
});

exports.upload = (files) => {
    return new Promise((resolve, reject) => {
        if (files.thumbnail) {
            cloudinary.v2.uploader.upload(files.thumbnail[0].filepath, { folder: 'researchPaper' }).then((uploaded) => {
                resolve(uploaded.secure_url);
            }).catch((error) => {
                reject("file not uploaded");
            });
        } else {
            reject("Invalid file key.")
        }
    });
}