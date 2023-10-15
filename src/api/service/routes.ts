import express from 'express';
import { ServiceController } from './controller';
import validateRequest from '../../middleware/validateRequest';
import { ServiceValidation } from './validation';
const router = express.Router();

router.post(
    '/create',
    validateRequest(ServiceValidation.ServiceSchema),
    ServiceController.createService
);
router.get('/:id', ServiceController.getSingleService);
router.get('/', ServiceController.getAllService);

export const ServiceRoute = router;
