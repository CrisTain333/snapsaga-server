import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { FaqService } from './service';
import sendResponse from '../../shared/sendResponse';

const createFaq = catchAsync(async (req: Request, res: Response) => {
    const { ...faqData } = req.body;
    console.log(faqData);
    const result = await FaqService.createFaq(faqData);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq Added successfully',
        data: result
    });
});

export const FaqController = {
    createFaq
};
