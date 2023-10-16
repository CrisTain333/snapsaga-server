import express from 'express';
import { TestRoute } from '../api/test/routes';
import { AuthRoute } from '../api/auth/routes';
import { UserRoute } from '../api/user/routes';
import { ServiceRoute } from '../api/service/routes';
import { BookingRoute } from '../api/booking/routes';

const router = express.Router();

router.use('/', TestRoute);
router.use('/auth', AuthRoute);
router.use('/user', UserRoute);
router.use('/service', ServiceRoute);
router.use('/booking', BookingRoute);

export default router;
