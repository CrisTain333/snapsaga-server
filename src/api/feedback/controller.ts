import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { FeedbackService } from './service';
import sendResponse from '../../shared/sendResponse';

const addFeedBack = catchAsync(
    async (req: Request, res: Response) => {
        const { ...feedback } = req.body;
        const result = await FeedbackService.addFeedback(feedback);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Feedback Added successfully',
            data: result
        });
    }
);

export const FeedbackController = {
    addFeedBack
};
