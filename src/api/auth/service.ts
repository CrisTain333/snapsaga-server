import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../error/ApiError';
import { httpCode } from '../../shared/httpCodes';
import { jwtHelpers } from '../../utils/helper/jwtHelpers';
import { ILoginUser } from './interface';
import bcrypt from 'bcrypt';
import { IUser } from '../user/interface';
import { prisma } from '../../shared/primsa';
import { hashPassword } from '../../shared/hashPassword';
import { User } from '@prisma/client';

const createUser = async (user: IUser): Promise<User | null> => {
    const { name, email, password } = user;

    //Check the email exist in database or not ;
    const isExits = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (isExits) {
        throw new ApiError(
            httpCode.BAD_REQUEST,
            'Email already exists'
        );
    }

    const hashedPassword = await hashPassword(password);
    const convertedPassword = hashedPassword;
    // now create the user;
    const newUser = await prisma.user.create({
        data: {
            email,
            name,
            password: convertedPassword
        }
    });

    return newUser;
};

const login = async (payload: ILoginUser) => {
    const { email: userEmail, password } = payload;
    const isUserExist = await prisma.user.findUnique({
        where: {
            email: userEmail
        }
    });

    // check the email exist
    if (!isUserExist) {
        throw new ApiError(httpCode.NOT_FOUND, 'User does not exist');
    }

    // check the password
    const isPasswordMatched = await bcrypt.compare(
        password,
        isUserExist?.password
    );

    // if not matched throw error;
    if (!isPasswordMatched) {
        throw new ApiError(
            httpCode.UNAUTHORIZED,
            'Invalid credentials'
        );
    }
    const { email, role } = isUserExist;

    // if matched created
    const accessToken = jwtHelpers.createToken(
        { role, email },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string
    );

    return {
        accessToken
    };
};

export const AuthService = { createUser, login };
