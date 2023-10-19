import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { FaqService } from './service';
import sendResponse from '../../shared/sendResponse';

const createFaq = catchAsync(async (req: Request, res: Response) => {
    const { ...faqData } = req.body;
    const result = await FaqService.createFaq(faqData);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq Added successfully',
        data: result
    });
});

const getFaq = catchAsync(async (req: Request, res: Response) => {
    const result = await FaqService.getFaq();
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq fetched successfully',
        data: result
    });
});
const deleteFaq = catchAsync(async (req: Request, res: Response) => {
    const id =  req.params.id
    const result = await FaqService.deleteFaq(parseInt(id));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq deleted successfully',
        data: result
    });
});
const updateFaq = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;
    const data = req.body
    const result = await FaqService.updateFaq(parseInt(id), data);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Faq updated successfully',
        data: result
    });
});

export const FaqController = {
    createFaq,
    getFaq,
    deleteFaq,
    updateFaq
};
