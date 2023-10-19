"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userZodValidation = void 0;
const zod_1 = require("zod");
const userUpdateZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required'
        }),
        email: zod_1.z
            .string({
            required_error: 'email is required'
        })
            .email(),
        location: zod_1.z.string().optional(),
        phone: zod_1.z.string().optional()
    })
});
const userUpdateAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'name is required'
        }),
        email: zod_1.z
            .string({
            required_error: 'email is required'
        })
            .email()
    })
});
exports.userZodValidation = {
    userUpdateZodSchema,
    userUpdateAdminZodSchema
};
