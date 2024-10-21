import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { catchAsync } from '@core/utils';
import { userRoles, userService } from '@modules/user';
import { tokenService } from '@modules/token';
import * as authService from './auth.service';
import { emailService } from '@modules/email';
import { generateCode } from '@constants';

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  // if (user.role === userRoles.VENDOR) {
  //   res.status(httpStatus.OK).json({
  //     status: true,
  //     user,
  //     message: 'Your account is under verification.',
  //   });
  //   emailService.vendorAccountReviewEmail(user.email, user.name);
  // } else {
  const tokens = await tokenService.generateAuthToken(user);
  res.status(httpStatus.CREATED).json({
    status: true,
    user,
    tokens,
  });
  emailService.sendWelcomeEmail(user.email, user.name);
  //}
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthToken(user);
  res.json({
    status: true,
    message: 'login successfully',
    user,
    tokens,
  });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
  await authService.logout(req.body.accessToken);
  res.status(200).json({ status: true });
});

export const verifyEmail = catchAsync(async (req: Request, res: Response) => {
  await authService.verifyEmail(req.query['token']);
  res.status(httpStatus.CREATED).send('Congratulations! Now you can go and login to your account');
});

export const verifyCode = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.verifyUserCode(req.headers.authorization, req.body.code);
  const tokens = await tokenService.generateResetPasswordToken(user.email);
  res.status(httpStatus.OK).json({
    status: true,
    message: 'Code successfully verified',
    tokens,
  });
});

export const forgotPassword = catchAsync(async (req: Request, res: Response) => {
  const user = await authService.forgotPassword(req.body.email);
  const code = generateCode(4);
  const tokens = await tokenService.generateForgotPasswordTokenAndCode(user, code);
  await emailService.sendForgotPasswordEmail(user.email, user.name, code);
  res.status(httpStatus.CREATED).json({
    status: true,
    message: `4 digit otp code sended at provided email ${user.email}`,
    tokens,
  });
});

export const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const authToken = req.headers.authorization.split(' ')[1];
  const user = await authService.resetPassword(authToken, req.body.password);
  const tokens = await tokenService.generateAuthToken(user);
  res.json({
    status: true,
    message: 'Password reset successfully',
    user,
    tokens,
  });
});

export const confirmEmail = catchAsync(async (req: Request, res: Response) => {
  const email = req.query.email as string;
  const user = await userService.getUserByEmail(email);
  let isEmailTaken = user !== null;
  res.status(httpStatus.OK).json({
    status: true,
    isEmailTaken,
  });
});
