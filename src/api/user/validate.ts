import { z } from 'zod';

const userUpdateZodSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'name is required'
        }),
        email: z
            .string({
                required_error: 'email is required'
            })
            .email(),
        location: z.string().optional(),
        phone: z.string().optional()
    })
});

export const userZodValidation = {
    userUpdateZodSchema
};
