/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import catchAsync from '../../shared/catchAsync';
import { UserService } from './service';
import sendResponse from '../../shared/sendResponse';

const getUser = catchAsync(async (req: any, res: Response) => {
    const user = req?.user;
    const result = await UserService.getUser(user);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User retrieved successfully',
        data: result
    });
});

const updateProfilePicture = catchAsync(
    async (req: any, res: Response) => {
        // const user = req?.user;
        const result = await UserService.updateProfilePicture(req);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Profile picture updated successfully',
            data: result
        });
    }
);

const updateProfileData = catchAsync(
    async (req: any, res: Response) => {
        const data = req?.body;
        const result = await UserService.updateProfileData(req, data);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: 'Profile  updated successfully',
            data: result
        });
    }
);
const getAllUsers = catchAsync(async (req: any, res: Response) => {
    const { page }: any = req.query;
    const result = await UserService.getAllUser(parseInt(page));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User  fetched successfully',
        data: result?.data,
        meta: result?.meta
    });
});
const deleteUser = catchAsync(async (req: any, res: Response) => {
    const id = req.params.id;
    const result = await UserService.deleteUser(parseInt(id));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User  deleted successfully',
        data: result
    });
});

const updateUser = catchAsync(async (req: any, res: Response) => {
    const email = req.params.id;
    const { ...updatedData } = req.body;
    console.log(updatedData);
    const result = await UserService.updateProfileByAdmin(
        email,
        updatedData
    );
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User  Updated successfully',
        data: result
    });
});

const getAdmins = catchAsync(async (req: any, res: Response) => {
    const { page }: any = req.query;
    const result = await UserService.getAllAdmin(parseInt(page));
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `admin's fetched successfully`,
        data: result?.data,
        meta: result?.meta
    });
});

const updateRole = catchAsync(async (req: any, res: Response) => {
    const email = req.params.email;
    const role = req.body.role;
    console.log(email);
    console.log(role);
    const result = await UserService.updateRole(email, role);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: `User role updated`,
        data: result
    });
});

export const UserController = {
    getUser,
    updateProfilePicture,
    updateProfileData,
    getAllUsers,
    deleteUser,
    updateUser,
    getAdmins,
    updateRole
};
