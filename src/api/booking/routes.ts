import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './validation';
import { BookingController } from './controller';
const router = express.Router();

router.post(
    '/',
    auth(),
    validateRequest(BookingValidation.BookingZodSchema),
    BookingController.createBooking
);

router.get('/', auth(), BookingController.getUserBookings);

export const BookingRoute = router;
