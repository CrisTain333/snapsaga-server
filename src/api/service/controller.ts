/* eslint-disable @typescript-eslint/no-explicit-any */
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
const getBestService = catchAsync(
    async (req: Request, res: Response) => {
        const { page }: any = req.query;
        const result = await sService.getBestServices(parseInt(page));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Best Service retrieve successfully',
            data: result?.data,
            meta: result?.meta
        });
    }
);
const updateService = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const { ...updatedData } = req.body;
        const result = await sService.updateService(
            parseInt(id),
            updatedData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Service updated successfully',
            data: result
        });
    }
);
const deleteServiceF = catchAsync(
    async (req: Request, res: Response) => {
        const id = req.params.id;
        const result = await sService.deleteService(parseInt(id));
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Service Deleted',
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
    getSingleService,
    getBestService,
    deleteServiceF,
    updateService
};
