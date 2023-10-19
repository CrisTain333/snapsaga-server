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
router.get('/', FaqController.getFaq);

router.delete(
    '/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    FaqController.deleteFaq
);
router.patch(
    '/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    FaqController.updateFaq
);

export const FaqRoute = router;
