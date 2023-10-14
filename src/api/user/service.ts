/* eslint-disable @typescript-eslint/no-explicit-any */
import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './interface';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';
import { uploadMultipleFiles } from '../../middleware/uploadImage';

const getUser = async (user: JwtPayload): Promise<IUser | null> => {
    const { email } = user;
    const profile = await prisma.user.findUnique({
        where: {
            email
        }
    });
    if (!profile) {
        throw new ApiError(httpCode.NOT_FOUND, 'User not found');
    }
    return profile;
};

const updateProfilePicture = async (req: any) => {
    const file = req.file;
    const { email } = req.user;
    try {
        const shopImage = [file];
        const imageUrl = await uploadMultipleFiles(shopImage);

        const data = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                profileImage: imageUrl[0]
            }
        });

        return data;
    } catch (error: any) {
        // console.log(error?.message);
        throw new ApiError(
            httpCode.INTERNAL_SERVER_ERROR,
            'Error uploading image'
        );
    }
};

const updateProfileData = async (req: any, data: any) => {
    const { email } = req.user;

    const newData = await prisma.user.update({
        where: {
            email: email
        },
        data: data
    });

    return newData;
};

export const UserService = {
    getUser,
    updateProfileData,
    updateProfilePicture
};
