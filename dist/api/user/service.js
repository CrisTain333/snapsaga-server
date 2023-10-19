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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const primsa_1 = require("../../shared/primsa");
const uploadImage_1 = require("../../middleware/uploadImage");
const getUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = user;
    const profile = yield primsa_1.prisma.user.findUnique({
        where: {
            email
        },
        include: {
            Booking: true
        }
    });
    if (!profile) {
        throw new ApiError_1.default(httpCodes_1.httpCode.NOT_FOUND, 'User not found');
    }
    return profile;
});
const updateProfilePicture = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const { email } = req.user;
    try {
        const shopImage = [file];
        const imageUrl = yield (0, uploadImage_1.uploadMultipleFiles)(shopImage);
        const data = yield primsa_1.prisma.user.update({
            where: {
                email: email
            },
            data: {
                profileImage: imageUrl[0]
            }
        });
        return data;
    }
    catch (error) {
        // console.log(error?.message);
        throw new ApiError_1.default(httpCodes_1.httpCode.INTERNAL_SERVER_ERROR, 'Error uploading image');
    }
});
const updateProfileData = (req, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.user;
    const newData = yield primsa_1.prisma.user.update({
        where: {
            email: email
        },
        data: data
    });
    return newData;
});
const getAllUser = (page = 1, pageSize = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const result = yield primsa_1.prisma.user.findMany({
        skip,
        take
    });
    const totalServices = yield primsa_1.prisma.user.count({});
    const meta = {
        page: parseInt(page),
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };
    return {
        data: result,
        meta: meta
    };
});
const getAllAdmin = (page = 1, pageSize = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (parseInt(page) - 1) * pageSize;
    const take = pageSize;
    const result = yield primsa_1.prisma.user.findMany({
        where: {
            role: 'admin'
        },
        skip,
        take
    });
    const totalServices = yield primsa_1.prisma.user.count({});
    const meta = {
        page: parseInt(page),
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };
    return {
        data: result,
        meta: meta
    };
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.user.delete({
            where: {
                id: parseInt(id)
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid Id');
    }
});
const updateProfileByAdmin = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = yield primsa_1.prisma.user.update({
            where: {
                id: parseInt(id)
            },
            data: data
        });
        return newData;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to update user data');
    }
});
const updateRole = (email, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.user.update({
            where: {
                email: email
            },
            data: {
                role: role
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'User Role Update Failed');
    }
});
exports.UserService = {
    getUser,
    updateProfileData,
    updateProfilePicture,
    getAllUser,
    deleteUser,
    updateProfileByAdmin,
    getAllAdmin,
    updateRole
};
