import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '@modules/paginate/paginate';
import { AccessToken } from '../token/token.interfaces';

import { Request } from 'express';

export interface IAdmin {
  fullName: string;
  email: string;
  profileImg: string;
  role: string;
  status: string;
  password: string;
  lastPasswordUpdate: Date | null;
  lastLogin: Date | null;
}

export interface IAdminDoc extends IAdmin, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IAdminModel extends Model<IAdminDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewCreatedAdmin = Omit<IAdmin, 'lastPasswordUpdate' | 'lastLogin'>;
export type UpdateAdminBody = Pick<IAdmin, 'role' | 'status'>;

export interface adminAuthReq extends Request {
  user: IAdminDoc;
}

export interface IAdminWithToken {
  user: IAdminDoc;
  token: AccessToken;
}
