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
exports.BookingService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const primsa_1 = require("../../shared/primsa");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const httpCodes_1 = require("../../shared/httpCodes");
const user_1 = require("../../enums/user");
const createBooking = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.booking.create({
            data
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to Book Service');
    }
});
const cancelBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.booking.update({
            where: {
                id: parseInt(bookingId)
            },
            data: {
                status: user_1.BookingStatus.CANCELED
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to cancel Booking');
    }
});
const confirmBooking = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield primsa_1.prisma.booking.update({
            where: {
                id: parseInt(bookingId)
            },
            data: {
                status: user_1.BookingStatus.CONFIRMED
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Failed to Confirm Booking');
    }
});
const getUserBooking = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const rUser = yield primsa_1.prisma.user.findUnique({
        where: {
            email: user.email
        }
    });
    const result = yield primsa_1.prisma.booking.findMany({
        where: {
            userId: rUser === null || rUser === void 0 ? void 0 : rUser.id
        },
        include: {
            service: true,
            user: true
        }
    });
    return result;
});
const deleteUserBooking = (bookingID) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = parseInt(bookingID);
    try {
        const result = yield primsa_1.prisma.booking.delete({
            where: {
                id: bookingId
            }
        });
        return result;
    }
    catch (error) {
        throw new ApiError_1.default(httpCodes_1.httpCode.BAD_REQUEST, 'Error Deleting Your Service');
    }
});
const getAllBookings = (page = 1, pageSize = 6) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const bookings = yield primsa_1.prisma.booking.findMany({
        include: {
            service: true,
            user: true
        },
        skip,
        take
    });
    const totalBooking = yield primsa_1.prisma.booking.count({});
    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalBooking / pageSize)
    };
    return {
        data: bookings,
        meta: meta
    };
});
exports.BookingService = {
    createBooking,
    getUserBooking,
    deleteUserBooking,
    getAllBookings,
    cancelBooking,
    confirmBooking
};
