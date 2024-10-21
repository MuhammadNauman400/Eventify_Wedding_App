import {
  INotificationDoc,
  INotification,
  NewNotification,
  IUserNotificationDoc,
  NewUserNotification,
} from './notification.interface';
import { ApiError } from '@core/errors';
import httpStatus from 'http-status';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import mongoose, { Schema } from 'mongoose';
import { Notification, UserNotification } from './notification.model';

export const createNotification = (
  notificationBody: NewNotification,
  createdBy: Schema.Types.ObjectId,
): Promise<INotificationDoc> => {
  return Notification.create({ ...notificationBody, createdBy });
};

export const getNotificatios = (
  filter: Record<string, any>,
  options: IOptions,
): Promise<QueryResult> => {
  return Notification.paginate(filter, options);
};

export const createUserNotification = (
  userNotificationBody: NewUserNotification,
  userId: Schema.Types.ObjectId,
): Promise<IUserNotificationDoc> => {
  const data = {
    ...userNotificationBody,
    user: userId,
  };
  return UserNotification.create(data);
};

export const getUsersNotification = async (
  filter: Record<string, any>,
  options: IOptions,
): Promise<QueryResult> => {
  return UserNotification.paginate(filter, options);
};
