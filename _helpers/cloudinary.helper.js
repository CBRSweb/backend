import cloudinary from 'cloudinary';
import { cloudinaryConfig } from '../_configs/cloudinary.config.js';

cloudinary.config({
    cloud_name: cloudinaryConfig.cloud_name,
    api_key: cloudinaryConfig.api_key,
    api_secret: cloudinaryConfig.api_secret,
});

export const upload = (files) => {
    return new Promise((resolve, reject) => {
        if (files.thumbnail) {
            cloudinary.v2.uploader.upload(files.thumbnail[0].filepath, { folder: 'researchPaper' })
                .then((uploaded) => {
                    resolve(uploaded.secure_url);
                })
                .catch((error) => {
                    reject("File not uploaded");
                });
        } else {
            reject("Invalid file key.");
        }
    });
};
