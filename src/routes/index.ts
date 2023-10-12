import express from 'express';
import { TestRoute } from '../api/test/routes';
import { AuthRoute } from '../api/auth/routes';

const router = express.Router();

router.use('/', TestRoute);
router.use('/auth', AuthRoute);
// router.use('/user', UserRoute);

export default router;
