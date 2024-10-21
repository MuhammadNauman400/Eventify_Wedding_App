import { Request, Response } from 'express';
import * as adminService from './admin.service';
import { adminTokenService } from '../admin_token';
import { emailService } from '@modules/email';
import httpStatus from 'http-status';
import { Types } from 'mongoose';
import { ApiError } from '@core/errors';
import { catchAsync } from '@core/utils';

export const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const password: string = req.body.password;
  const admin = await adminService.createdAdmin(req.body);
  await emailService.sendNewAdminEmail(admin.email, admin.fullName, admin.role, password);
  res.status(201).json({
    status: true,
    admin,
  });
});

export const getAdmins = catchAsync(async (req: Request, res: Response) => {
  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);
  const authStatus = req.query.authStatus as string;
  const role = req.query.role as string;
  const filters: any = {};
  if (authStatus) filters.status = authStatus;
  if (role) filters.role = role;

  const admins = await adminService.queryAdmins(filters, { page, limit });
  res.status(httpStatus.OK).json({
    status: true,
    admins,
  });
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const admin = await adminService.loginUserWithEmailAndPassword(email, password);
  const tokens = await adminTokenService.generateAuthToken(admin);
  res.json({
    status: true,
    message: 'login successfully',
    admin,
    tokens,
  });
});

export const updateAdminProfileById = catchAsync(async (req: Request, res: Response) => {
  const admin = await adminService.getAdminById(new Types.ObjectId(req.params.adminId));
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  delete req.body.actionType;
  const latestAdmin = await adminService.updateAdmin(admin, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    admin: latestAdmin,
  });
});

export const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const adminId = req.params.adminId;
  const admin = await adminService.deleteAdmin(new Types.ObjectId(adminId));
  if (!admin) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found');
  }
  res.json({
    status: true,
    message: 'deleted successfully',
    admin,
  });
});
