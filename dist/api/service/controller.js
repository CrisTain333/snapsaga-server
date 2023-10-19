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
exports.ServiceController = void 0;
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const service_1 = require("./service");
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const getSingleService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield service_1.sService.getSingleService(parseInt(id));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service retrieve successfully',
        data: result
    });
}));
const getBestService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page } = req.query;
    const result = yield service_1.sService.getBestServices(parseInt(page));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Best Service retrieve successfully',
        data: result === null || result === void 0 ? void 0 : result.data,
        meta: result === null || result === void 0 ? void 0 : result.meta
    });
}));
const createService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_1.sService.createService(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'service created successfully',
        data: result
    });
}));
const updateService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const updatedData = __rest(req.body, []);
    const result = yield service_1.sService.updateService(parseInt(id), updatedData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service updated successfully',
        data: result
    });
}));
const deleteServiceF = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield service_1.sService.deleteService(parseInt(id));
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service Deleted',
        data: result
    });
}));
const getAllService = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const { ...serviceData } = req.body;
    const { page, pageSize, searchQuery, category, minPrice, maxPrice } = req.query;
    const parsedPage = typeof page === 'string' ? parseInt(page, 10) : undefined;
    const parsedPageSize = typeof pageSize === 'string'
        ? parseInt(pageSize, 10)
        : undefined;
    const parsedMinPrice = typeof minPrice === 'string'
        ? parseFloat(minPrice)
        : undefined;
    const parsedMaxPrice = typeof maxPrice === 'string'
        ? parseFloat(maxPrice)
        : undefined;
    const result = yield service_1.sService.getAllServices(parsedPage, parsedPageSize, searchQuery, category, parsedMinPrice, parsedMaxPrice);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Service retrieved successfully',
        data: result.data,
        meta: result.meta
    });
}));
exports.ServiceController = {
    createService,
    getAllService,
    getSingleService,
    getBestService,
    deleteServiceF,
    updateService
};
