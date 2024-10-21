import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '@core/utils';
import * as userService from './user.service';
import { IUserDoc } from './user.interfaces';
import { Types } from 'mongoose';
import { emailService } from '@modules/email';

interface AuthReq extends Request {
  user: IUserDoc;
}

export const updateProfile = catchAsync(async (req: AuthReq, res: Response) => {
  const user = await userService.updateUser(req.user, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    user,
  });
});

export const resetPassword = catchAsync(async (req: AuthReq, res: Response) => {
  const user = await userService.resetPassword(
    req.user,
    req.body.currentPassword,
    req.body.newPassword,
  );
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Password reset successfully',
    user,
  });
});

export const deleteUserAccount = catchAsync(async (req: AuthReq, res: Response) => {
  const user = await userService.deleteUserById(req.user.id);
  res.status(httpStatus.OK).json({
    status: true,
    user,
    message: 'User deleted successfully',
  });
});

//  admin
export const getUsers = catchAsync(async (req: Request, res: Response) => {
  const username = req.query.username as string;
  const filters: any = {};
  if (username) {
    filters.$or = [
      { name: { $regex: new RegExp(username, 'i') } },
      { email: { $regex: new RegExp(username, 'i') } },
    ];
  }
  const options = {
    page: Number(req.query.page || 1),
    limit: Number(req.query.limit || 20),
  };
  const users = await userService.queryUsers(filters, options);
  res.status(httpStatus.OK).json({
    status: true,
    users,
  });
});

export const getUserDetails = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.getUserDetailsById(req.params.userId);
  res.status(httpStatus.OK).json({
    status: true,
    user,
  });
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.userId.toString();
  const user = await userService.updateUserById(new Types.ObjectId(userId), req.body);
  res.status(httpStatus.OK).json({
    status: true,
    user,
  });
});
