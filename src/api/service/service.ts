/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import { prisma } from '../../shared/primsa';

const createService = async (data: any): Promise<Service> => {
    const result = await prisma.service.create({
        data: data
    });
    return result;
};

export const sService = {
    createService
};
