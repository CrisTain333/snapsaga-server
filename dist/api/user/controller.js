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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const getUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req === null || req === void 0 ? void 0 : req.user;
    const result = yield service_1.UserService.getUser(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result
    });
}));
const updateProfilePicture = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const user = req?.user;
    const result = yield service_1.UserService.updateProfilePicture(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile picture updated successfully',
        data: result
    });
}));
const updateProfileData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req === null || req === void 0 ? void 0 : req.body;
    const result = yield service_1.UserService.updateProfileData(req, data);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Profile  updated successfully',
        data: result
    });
}));
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const result = yield service_1.UserService.getAllUser(parseInt(page));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User  fetched successfully',
        data: result === null || result === void 0 ? void 0 : result.data,
        meta: result === null || result === void 0 ? void 0 : result.meta
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_1.UserService.deleteUser(parseInt(id));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User  deleted successfully',
        data: result
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.id;
    const updatedData = __rest(req.body, []);
    console.log(updatedData);
    const result = yield service_1.UserService.updateProfileByAdmin(email, updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'User  Updated successfully',
        data: result
    });
}));
const getAdmins = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const result = yield service_1.UserService.getAllAdmin(parseInt(page));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `admin's fetched successfully`,
        data: result === null || result === void 0 ? void 0 : result.data,
        meta: result === null || result === void 0 ? void 0 : result.meta
    });
}));
const updateRole = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.email;
    const role = req.body.role;
    const result = yield service_1.UserService.updateRole(email, role);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: `User role updated`,
        data: result
    });
}));
exports.UserController = {
    getUser,
    updateProfilePicture,
    updateProfileData,
    getAllUsers,
    deleteUser,
    updateUser,
    getAdmins,
    updateRole
};
