import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '@modules/paginate/paginate';
import { AccessToken } from '../token/token.interfaces';

/*
    @@ User model
*/
export interface IUser {
  name: string;
  email: string;
  password?: string;
  status?: string;
  role: string;
  authProviders: Array<string>;
  address?: {
    city: string;
    country: string;
  };
  phone?: string;
  allowNotify: boolean;
  lastLogin?: Date | String;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type UpdateUserBody = Partial<IUser>;
export type NewRegisteredUser = Omit<IUser, 'role'>;

export type NewCreatedUser = Omit<IUser, 'allowNotify'>;

export interface IUserWithToken {
  user: IUserDoc;
  token: AccessToken;
}

export type NewSocialUser = Pick<IUser, 'name' | 'email'>;
export type NewRegisteredSocialUser = Partial<NewSocialUser>;
