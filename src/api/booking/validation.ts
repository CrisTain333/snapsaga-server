import { z } from 'zod';

const BookingZodSchema = z.object({
    body: z.object({
        userId: z.number({
            required_error: 'user id is  required'
        }),
        serviceId: z.number({
            required_error: 'service id is  required'
        }),
        bookingInfo: z.object({})
    })
});

export const BookingValidation = { BookingZodSchema };
