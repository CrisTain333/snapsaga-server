/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from '@prisma/client';
import { prisma } from '../../shared/primsa';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';

const createService = async (data: any): Promise<Service> => {
    const result = await prisma.service.create({
        data: data
    });
    return result;
};

const getAllServices = async (
    page: number = 1,
    pageSize: number = 10,
    searchQuery?: string,
    category?: string,
    minPrice?: number,
    maxPrice?: number
) => {
    const skip = (page - 1) * pageSize;
    const take = pageSize;

    const where: any = {
        AND: [
            searchQuery
                ? {
                      OR: [
                          {
                              title: {
                                  contains: searchQuery.toLowerCase()
                              }
                          },
                          {
                              description: {
                                  contains: searchQuery.toLowerCase()
                              }
                          },
                          {
                              category: {
                                  contains: searchQuery.toLowerCase()
                              }
                          }
                          // Add more fields to search as needed
                      ]
                  }
                : undefined,
            category
                ? { category: { contains: category } }
                : undefined,
            minPrice ? { price: { gte: minPrice } } : undefined,
            maxPrice ? { price: { lte: maxPrice } } : undefined
        ].filter(Boolean)
    };

    const services = await prisma.service.findMany({
        where,
        skip,
        take
    });

    const totalServices = await prisma.service.count({});

    const meta = {
        page: page,
        limit: pageSize,
        total: Math.ceil(totalServices / pageSize)
    };

    return {
        data: services,
        meta: meta
    };
};

const getSingleService = async (id: number) => {
    const result = await prisma.service.findUnique({
        where: {
            id
        }
    });

    if (!result) {
        throw new ApiError(httpCode.BAD_REQUEST, 'Invalid id');
    }

    return result;
};

const getBestServices = async () => {
    const services = await prisma.service.findMany({});
    return services;
};

export const sService = {
    createService,
    getAllServices,
    getSingleService,
    getBestServices
};
