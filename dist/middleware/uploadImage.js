"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultipleFiles = void 0;
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
function uploadMultipleFiles(files) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(files);
        try {
            const uploadResults = [];
            // Loop through the files and upload each one
            for (const file of files) {
                if ((file === null || file === void 0 ? void 0 : file.fieldname) === 'banner') {
                    const uploadResult = yield cloudinary.uploader.upload(file.path, {
                        folder: 'snap-sega/products'
                    });
                    uploadResults.push(uploadResult.secure_url);
                }
                else if ((file === null || file === void 0 ? void 0 : file.fieldname) === 'profilePicture') {
                    const uploadResult = yield cloudinary.uploader.upload(file.path, {
                        folder: 'snap-sega/User-profile'
                    });
                    uploadResults.push(uploadResult.secure_url);
                }
            }
            return uploadResults;
        }
        catch (error) {
            console.error('Error uploading files:', error);
            throw error;
        }
    });
}
exports.uploadMultipleFiles = uploadMultipleFiles;
module.exports = { uploadMultipleFiles };
