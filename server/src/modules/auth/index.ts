export * as authController from './auth.controller';
export * as authValidation from './auth.validation';
export * as authInterfaces from './auth.interfaces';
import authRouter from './auth.router';
import { AuthReq } from './auth.interfaces';

import auth from './auth.middleware';
import jwtStrategy from './passport';

export { auth, jwtStrategy, authRouter, AuthReq };
