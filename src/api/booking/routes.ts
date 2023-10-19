import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { BookingValidation } from './validation';
import { BookingController } from './controller';
import { User_Role } from '../../enums/user';
const router = express.Router();

router.post(
    '/',
    auth(),
    validateRequest(BookingValidation.BookingZodSchema),
    BookingController.createBooking
);
router.get(
    '/all-bookings',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    BookingController.getAllBookings
);
router.patch(
    '/cancel-booking/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    BookingController.cancelBookings
);
router.patch(
    '/confirm-booking/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    BookingController.confirmBookings
);
router.delete(
    '/:id',
    auth(User_Role.USER, User_Role.SUPER_ADMIN),
    BookingController.deleteUserBooking
);

router.get('/', auth(), BookingController.getUserBookings);

export const BookingRoute = router;
