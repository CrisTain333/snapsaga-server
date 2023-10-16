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

export const BookingController = {
    createBooking
};
