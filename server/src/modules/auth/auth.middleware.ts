import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
import httpStatus from 'http-status';
import { ApiError } from '@core/errors';
import { roleRights } from '@core/middlewares/roles.moddleware';
import { IUserDoc } from '../user/user.interfaces';
import { AuthReq } from './auth.interfaces';

const verifyCallback =
  (req: any, resolve: any, reject: any, requiredRights: string[]) => async (err: Error, user: IUserDoc, info: string) => {
    if (err || info || !user) {
      return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;
    resolve();
  };

const authMiddleware =
  (...requiredRights: string[]) =>
  async (req: Request, res: Response, next: NextFunction) =>
    new Promise<void>((resolve, reject) => {
      passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredRights))(req, res, next);
    })
      .then(() => next())
      .catch((err) => next(err));

export default authMiddleware;
