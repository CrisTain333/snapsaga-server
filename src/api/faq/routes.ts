import express from 'express';
import { FaqController } from './controller';
import auth from '../../middleware/auth';
import { User_Role } from '../../enums/user';
const router = express.Router();

router.post(
    '/',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    FaqController.createFaq
);

export const FaqRoute = router;
