/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../shared/primsa';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { BookingStatus } from '../../enums/user';

const createBooking = async (data: any) => {
    try {
        const result = await prisma.booking.create({
            data
        });
        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to Book Service'
        );
    }
};
const cancelBooking = async (bookingId: any) => {
    console.log(bookingId);
    try {
        const result = await prisma.booking.update({
            where: {
                id: parseInt(bookingId)
            },
            data: {
                status: BookingStatus.CANCELED
            }
        });
        return result;
    } catch (error) {
        console.log(error);
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to cancel Booking'
        );
    }
};

const getUserBooking = async (user: any) => {
    const rUser = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    });

    const result = await prisma.booking.findMany({
        where: {
            userId: rUser?.id
        },
        include: {
            service: true,
            user: true
        }
    });

    return result;
};

const deleteUserBooking = async (bookingID: any) => {
    const bookingId = parseInt(bookingID);
    try {
        const result = await prisma.booking.delete({
            where: {
                id: bookingId
            }
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Error Deleting Your Service'
        );
    }
};

const getAllBookings = async (
    page: number = 1,
    pageSize: number = 5
) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;
    const bookings = await prisma.booking.findMany({
        include: {
            service: true,
            user: true
        },
        skip,
        take
    });

    const totalBooking = await prisma.booking.count({});

    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalBooking / pageSize)
    };

    return {
        data: bookings,
        meta: meta
    };
};

export const BookingService = {
    createBooking,
    getUserBooking,
    deleteUserBooking,
    getAllBookings,
    cancelBooking
};
