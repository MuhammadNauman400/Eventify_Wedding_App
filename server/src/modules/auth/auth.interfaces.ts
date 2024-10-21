import { Request } from 'express';
import { IUserDoc } from '@modules/user';

export interface AuthReq extends Request {
  user: IUserDoc;
}
