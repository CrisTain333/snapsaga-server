"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSystem = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './src/uploads/');
    },
    filename: (req, file, cb) => {
        const fileName = Date.now() + '_' + file.originalname;
        file.originalname = fileName;
        cb(null, fileName);
    }
});
exports.uploadSystem = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'images' ||
            file.fieldname === 'banner' ||
            file.fieldname === 'shopProfile' ||
            file.fieldname === 'profilePicture') {
            if (file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png') {
                cb(null, true);
            }
            else {
                cb(new Error('only .jpg .jpeg .png  are allowed'));
            }
        }
    }
});
// module.exports = newUploadSystem;
