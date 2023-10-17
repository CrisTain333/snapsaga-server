import express from 'express';
import { FeedbackController } from './controller';
const router = express.Router();

router.post('/', FeedbackController.addFeedBack);

export const FeedBackRoute = router;
