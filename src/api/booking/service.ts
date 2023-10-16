/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../shared/primsa';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';

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

export const BookingService = {
    createBooking,
    getUserBooking
};
