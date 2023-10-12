import { JwtPayload } from 'jsonwebtoken';
import { IUser } from './interface';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { prisma } from '../../shared/primsa';

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

export const UserService = {
    getUser
};
