import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
import { uploadSystem } from '../../middleware/uploadSystem';
import validateRequest from '../../middleware/validateRequest';
import { userZodValidation } from './validate';
const router = express.Router();

router.get('/me', auth(), UserController.getUser);
router.post(
    '/update-profile',
    auth(),
    uploadSystem.single('profilePicture'),
    UserController.updateProfilePicture
);
router.post(
    '/update-profile-data',
    validateRequest(userZodValidation.userUpdateZodSchema),
    auth(),
    UserController.updateProfileData
);

export const UserRoute = router;
