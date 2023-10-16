import express from 'express';
import auth from '../../middleware/auth';
import { ReviewController } from './controller';
const router = express.Router();

router.post('/', auth(), ReviewController.createReview);

export const ReviewRoute = router;
