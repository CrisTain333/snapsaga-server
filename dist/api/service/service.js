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
exports.sService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Service } from '@prisma/client';
const primsa_1 = require("../../shared/primsa");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const uploadImage_1 = require("../../middleware/uploadImage");
const getAllServices = (page = 1, pageSize = 10, searchQuery, category, minPrice, maxPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const where = {
        AND: [
            searchQuery
                ? {
                    OR: [
                        {
                            title: {
                                contains: searchQuery.toLowerCase()
                            }
                        },
                        {
                            description: {
                                contains: searchQuery.toLowerCase()
                            }
                        },
                        {
                            category: {
                                contains: searchQuery.toLowerCase()
                            }
                        }
                        // Add more fields to search as needed
                    ]
                }
                : undefined,
            category
                ? { category: { contains: category } }
                : undefined,
            minPrice ? { price: { gte: minPrice } } : undefined,
            maxPrice ? { price: { lte: maxPrice } } : undefined
        ].filter(Boolean)
    };
    const services = yield primsa_1.prisma.service.findMany({
        where,
        skip,
        take
    });
    const totalServices = yield primsa_1.prisma.service.count({});
    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };
    return {
        data: services,
        meta: meta
    };
});
const getSingleService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield primsa_1.prisma.service.findUnique({
        where: {
            id
        }
    });
    if (!result) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid id');
    }
    return result;
});
const getBestServices = (page = 1, pageSize = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const services = yield primsa_1.prisma.service.findMany({
        skip,
        take
    });
    const totalServices = yield primsa_1.prisma.service.count({});
    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };
    return {
        data: services,
        meta: meta
    };
});
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const services = yield primsa_1.prisma.service.delete({
            where: {
                id: parseInt(id)
            }
        });
        return services;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid id');
    }
});
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const service = yield primsa_1.prisma.service.update({
            where: {
                id: id
            },
            data: data
        });
        return service;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to update Service');
    }
});
const createService = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    // console.log(file)
    const images = [file];
    const serviceData = req.body;
    const { title, price, category, availability, rating, description } = serviceData;
    try {
        const imageUrl = yield (0, uploadImage_1.uploadMultipleFiles)(images);
        const result = yield primsa_1.prisma.service.create({
            data: {
                title,
                price: parseInt(price),
                availability: availability === 'true' ? true : false,
                category,
                description,
                rating,
                banner: imageUrl[0]
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, ' An Error was encountered while creating service');
    }
});
exports.sService = {
    // createService,
    createService,
    getAllServices,
    getSingleService,
    getBestServices,
    deleteService,
    updateService
};
