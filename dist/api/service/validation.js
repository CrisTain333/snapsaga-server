"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const ServiceSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'title required'
        }),
        banner: zod_1.z.object({}, {
            required_error: 'image is required'
        }),
        description: zod_1.z.string({
            required_error: 'description required'
        }),
        category: zod_1.z.string({
            required_error: 'category required'
        }),
        price: zod_1.z.number({
            required_error: 'price required'
        }),
        availability: zod_1.z.boolean({
            required_error: 'availability required'
        }),
        rating: zod_1.z.string().optional()
    })
});
exports.ServiceValidation = { ServiceSchema };
