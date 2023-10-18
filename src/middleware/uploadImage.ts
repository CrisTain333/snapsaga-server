/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const cloudinary = require('cloudinary').v2;

// import cloudinary from 'cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

export async function uploadMultipleFiles(files: any) {
    console.log(files);
    try {
        const uploadResults = [];

        // Loop through the files and upload each one
        for (const file of files) {
            if (file?.fieldname === 'banner') {
                const uploadResult = await cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: 'snap-sega/products'
                    }
                );
                uploadResults.push(uploadResult.secure_url);
            } else if (file?.fieldname === 'profilePicture') {
                const uploadResult = await cloudinary.uploader.upload(
                    file.path,
                    {
                        folder: 'snap-sega/User-profile'
                    }
                );
                uploadResults.push(uploadResult.secure_url);
            }
        }

        return uploadResults;
    } catch (error) {
        console.error('Error uploading files:', error);
        throw error;
    }
}

module.exports = { uploadMultipleFiles };
