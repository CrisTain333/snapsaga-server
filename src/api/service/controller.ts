import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { sService } from './service';
import sendResponse from '../../shared/sendResponse';

const createService = catchAsync(
    async (req: Request, res: Response) => {
        const { ...serviceData } = req.body;
        const result = await sService.createService(serviceData);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Service created successfully',
            data: result
        });
    }
);

export const ServiceController = {
    createService
};
