/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';

const createReview = async (data: any) => {
    try {
        const result = await prisma.review.create({
            data: data
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to add review'
        );
    }
};

export const ReviewService = {
    createReview
};
