import mongoose from 'mongoose';
import {
  INotificationDoc,
  INotificationModel,
  IUserNotificationDoc,
  IUserNotificationModel,
} from './notification.interface';

import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';

import {
  notificationModelName,
  notificationTypes,
  notifiyDeliveryMethods,
  userNotificationModelName,
  userNotificationStatus,
  notificationStatus,
} from './notification.constants';
import { userConstants } from '../user';
import { adminConstants } from '../admin';

const notificationFilterSchema = new mongoose.Schema(
  {
    activeUsersOnly: {
      type: Boolean,
      default: false,
    },
    lastLoginBefore: Date,
  },
  { _id: false },
);

const notificationSchema = new mongoose.Schema<INotificationDoc, INotificationModel>(
  {
    refType: {
      type: String,
      enum: Object.values(notificationTypes),
      default: notificationTypes.GENERAL,
    },
    refId: {
      type: String,
      default: '',
    },
    message: {
      type: String,
      required: true,
    },
    scheduledFor: {
      type: Date || null,
      default: null,
    },
    filters: {
      type: notificationFilterSchema,
    },
    deliveryMethods: [
      {
        type: String,
        enum: Object.values(notifiyDeliveryMethods),
        default: notifiyDeliveryMethods.SAVE,
      },
    ],
    status: {
      type: String,
      enum: Object.values(notificationStatus),
      default: notificationStatus.PENDING,
    },
    createdBy: {
      type: String,
      ref: adminConstants.modelName,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  },
);

notificationSchema.plugin(toJSON);
notificationSchema.plugin(paginate);

export const Notification = mongoose.model<INotificationDoc, INotificationModel>(
  notificationModelName,
  notificationSchema,
);

const userNotificationSchema = new mongoose.Schema<IUserNotificationDoc, IUserNotificationModel>(
  {
    notification: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
      ref: userConstants.userModel,
    },
    status: {
      type: String,
      enum: Object.values(userNotificationStatus),
      default: userNotificationStatus.PENDING,
    },
    sentAt: {
      type: Date || null,
      default: null,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
  },
);

userNotificationSchema.plugin(toJSON);
userNotificationSchema.plugin(paginate);

export const UserNotification = mongoose.model<IUserNotificationDoc, IUserNotificationModel>(
  userNotificationModelName,
  userNotificationSchema,
);
