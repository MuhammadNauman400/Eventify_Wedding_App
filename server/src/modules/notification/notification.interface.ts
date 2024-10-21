import { Model, Document } from 'mongoose';
import { notifiyDeliveryMethods } from './notification.constants';
import { QueryResult } from '@modules/paginate/paginate';

export interface IReciever {
  user: string;
  isRead: boolean;
}

export interface NotificationFilter {
  activeUsersOnly?: boolean;
  lastLoginBefore?: Date;
}

export interface INotification {
  refType: string;
  refId?: string;
  message: string;
  createdBy: string;
  scheduledFor: Date | null;
  filters?: NotificationFilter;
  status: string;
  deliveryMethods: string[];
  createdAt: Date;
}

export interface INotificationDoc extends INotification, Document {}
export interface INotificationModel extends Model<INotificationDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewNotification = Omit<INotification, 'createdAt' | 'createdBy'>;

export interface IUserNotification {
  notification: string;
  user: string;
  status: string;
  createdAt: Date;
  sentAt: Date | null;
}

export type NewUserNotification = Omit<INotification, 'user createdAt'>;
export interface IUserNotificationDoc extends IUserNotification, Document {}
export interface IUserNotificationModel extends Model<IUserNotificationDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}
