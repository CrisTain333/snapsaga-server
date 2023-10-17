/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '../../shared/primsa';

const addFeedback = async (data: any) => {
    const result = await prisma.feedback.create({
        data: data
    });

    return result;
};

export const FeedbackService = {
    addFeedback
};
