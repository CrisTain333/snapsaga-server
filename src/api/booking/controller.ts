/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import sendResponse from '../../shared/sendResponse';
import { BookingService } from './service';

const createBooking = catchAsync(
    async (req: Request, res: Response) => {
        const { ...bookingData } = req.body;
        const result = await BookingService.createBooking(
            bookingData
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Booking successfully',
            data: result
        });
    }
);
const getUserBookings = catchAsync(
    async (req: any, res: Response) => {
        const user = req.user;
        const result = await BookingService.getUserBooking(user);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Bookings retrieve successfully',
            data: result
        });
    }
);
const getAllBookings = catchAsync(async (req: any, res: Response) => {
    const { page }: any = req.query;
    const result = await BookingService.getAllBookings(
        parseInt(page)
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Bookings fetched successfully',
        data: result?.data,
        meta: result?.meta
    });
});

const cancelBookings = catchAsync(async (req: any, res: Response) => {
    // const { page }: any = req.query;
    const id = req.params.id;
    const result = await BookingService.cancelBooking(parseInt(id));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Bookings canceled successfully',
        data: result
    });
});
const confirmBookings = catchAsync(
    async (req: any, res: Response) => {
        // const { page }: any = req.query;
        const id = req.params.id;
        const result = await BookingService.confirmBooking(
            parseInt(id)
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Bookings confirmed successfully',
            data: result
        });
    }
);

const deleteUserBooking = catchAsync(
    async (req: any, res: Response) => {
        // const user = req.user;
        const bookingId = req.params.id;
        const result = await BookingService.deleteUserBooking(
            bookingId
        );
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Booking Canceled successfully',
            data: result
        });
    }
);

export const BookingController = {
    createBooking,
    getUserBookings,
    deleteUserBooking,
    getAllBookings,
    cancelBookings,
    confirmBookings
};
