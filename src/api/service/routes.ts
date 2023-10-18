import express from 'express';
import { ServiceController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { ServiceValidation } from './validation';
import auth from '../../middleware/auth';
import { User_Role } from '../../enums/user';
const router = express.Router();

router.post(
    '/create',
    validateRequest(ServiceValidation.ServiceSchema),
    ServiceController.createService
);
router.get('/best-services', ServiceController.getBestService);
router.get('/:id', ServiceController.getSingleService);
router.get('/', ServiceController.getAllService);
router.delete(
    '/:id',
    auth(User_Role.SUPER_ADMIN, User_Role.ADMIN),
    ServiceController.deleteServiceF
);
router.patch(
    '/:id',
    auth(User_Role.SUPER_ADMIN, User_Role.ADMIN),
    ServiceController.updateService
);

export const ServiceRoute = router;
