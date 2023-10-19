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
exports.ReviewService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const primsa_1 = require("../../shared/primsa");
const createReview = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.review.create({
            data: data
        });
        return result;
    }
    catch (error) {
        console.log(error);
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to add review');
    }
});
const getReviewsById = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.review.findMany({
            where: {
                serviceId: serviceId
            },
            include: {
                service: true,
                user: true
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Invalid Id');
    }
});
exports.ReviewService = {
    createReview,
    getReviewsById
};
