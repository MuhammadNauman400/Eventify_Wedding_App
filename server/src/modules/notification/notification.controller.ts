import { catchAsync } from '@core/utils';
import { Request, Response } from 'express';
import * as notificationService from './notification.service';
import httpStatus from 'http-status';

import { adminInterfaces } from '../admin';

export const createNotification = catchAsync(
  async (req: adminInterfaces.adminAuthReq, res: Response) => {
    const notification = await notificationService.createNotification(req.body, req.user.id);
    res.status(httpStatus.OK).json({
      status: true,
      notification,
    });
  },
);

export const getNotifications = catchAsync(
  async (req: adminInterfaces.adminAuthReq, res: Response) => {
    const filters = {};
    const page: number = Number(req.query.page);
    const limit: number = Number(req.query.limit);
    const options = { page, limit, populate: 'createdBy', select: 'createdBy:fullName email' };
    const notifications = await notificationService.getNotificatios(filters, options);
    res.status(httpStatus.OK).json({
      status: true,
      notifications,
    });
  },
);
