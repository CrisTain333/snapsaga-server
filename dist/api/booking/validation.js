"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingValidation = void 0;
const zod_1 = require("zod");
const BookingZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        userId: zod_1.z.number({
            required_error: 'user id is  required'
        }),
        serviceId: zod_1.z.number({
            required_error: 'service id is  required'
        }),
        bookingInfo: zod_1.z.object({})
    })
});
exports.BookingValidation = { BookingZodSchema };
