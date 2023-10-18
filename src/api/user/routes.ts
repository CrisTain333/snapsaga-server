import express from 'express';
import { UserController } from './controller';
import auth from '../../middleware/auth';
import { uploadSystem } from '../../middleware/uploadSystem';
import validateRequest from '../../middleware/validateRequest';
import { userZodValidation } from './validate';
import { User_Role } from '../../enums/user';
const router = express.Router();

router.get(
    '/all-users',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    UserController.getAllUsers
);
router.get('/me', auth(), UserController.getUser);
router.post(
    '/update-profile',
    auth(),
    uploadSystem.single('profilePicture'),
    UserController.updateProfilePicture
);

// router.patch('/update-role');
router.get(
    '/admins',
    auth(User_Role.SUPER_ADMIN),
    UserController.getAdmins
);

router.patch(
    '/admin/update-role',
    auth(User_Role.SUPER_ADMIN),
    UserController.updateRole
);

router.post(
    '/update-profile-data',
    validateRequest(userZodValidation.userUpdateZodSchema),
    auth(),
    UserController.updateProfileData
);

router.delete(
    '/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    UserController.deleteUser
);
router.post(
    '/:email',
    validateRequest(userZodValidation.userUpdateZodSchema),
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    UserController.updateProfileData
);
export const UserRoute = router;
