import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { ReviewService } from './service';
import sendResponse from '../../shared/sendResponse';

const createReview = catchAsync(
    async (req: Request, res: Response) => {
        const { ...reviewData } = req.body;
        const result = await ReviewService.createReview(reviewData);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Review Added successfully',
            data: result
        });
    }
);

export const ReviewController = {
    createReview
};
