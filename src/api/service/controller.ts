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
            message: 'Service retrieved successfully',
            data: result
        });
    }
);
const getSingleService = catchAsync(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const result = await sService.getSingleService(parseInt(id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Service retrieve successfully',
            data: result
        });
    }
);

const getAllService = catchAsync(
    async (req: Request, res: Response) => {
        // const { ...serviceData } = req.body;
        const {
            page,
            pageSize,
            searchQuery,
            category,
            minPrice,
            maxPrice
        } = req.query;
        const parsedPage =
            typeof page === 'string' ? parseInt(page, 10) : undefined;
        const parsedPageSize =
            typeof pageSize === 'string'
                ? parseInt(pageSize, 10)
                : undefined;
        const parsedMinPrice =
            typeof minPrice === 'string'
                ? parseFloat(minPrice)
                : undefined;
        const parsedMaxPrice =
            typeof maxPrice === 'string'
                ? parseFloat(maxPrice)
                : undefined;

        const result = await sService.getAllServices(
            parsedPage,
            parsedPageSize,
            searchQuery as string,
            category as string,
            parsedMinPrice,
            parsedMaxPrice
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Service retrieved successfully',
            data: result.data,
            meta: result.meta
        });
    }
);

export const ServiceController = {
    createService,
    getAllService,
    getSingleService
};
