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
    '/admin/update-role/:email',
    auth(User_Role.SUPER_ADMIN),
    UserController.updateRole
);

router.patch(
    '/:id',
    validateRequest(userZodValidation.userUpdateAdminZodSchema),
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    UserController.updateUser
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

export const UserRoute = router;
