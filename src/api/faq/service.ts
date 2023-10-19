/* eslint-disable @typescript-eslint/no-explicit-any */
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';

const createFaq = async (data: any) => {
    try {
        const result = await prisma.fAQ.create({
            data: data
        });

        return result;
    } catch (error) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Failed to create faq'
        );
    }
};

export const FaqService = {
    createFaq
};
