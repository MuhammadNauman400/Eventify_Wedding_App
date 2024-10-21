import mongoose from 'mongoose';
import { Types } from 'mongoose';
import httpStatus from 'http-status';
import { userService, userConstants } from '@modules/user';
import { Token } from '@modules/token';
import { ApiError } from '@core/errors';
import { tokenTypes } from '@modules/token';
import { getUserByEmail, getUserById, updateUserById } from '@modules/user/user.service';
import { IUserDoc, authStatus, authProviders } from '@modules/user';
import { verifyToken } from '@modules/token/token.service';
import { tokenService } from '@modules/token';

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IUserDoc>}
 */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<IUserDoc> => {
  const user = await getUserByEmail(email);
  if (
    !user ||
    !user.authProviders.includes(authProviders.EMAIL) ||
    !(await user.isPasswordMatch(password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (user.status == authStatus.PENDING) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Account verification required. Please check your email to verify your account.',
    );
  }
  if (user.status == authStatus.SUSPENDED) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Your account has been suspended. Contact Support');
  }
  return user;
};

/**
 * Logout
 * @param {string} accessToken
 * @returns {Promise<void>}
 */
export const logout = async (accessToken: string): Promise<void> => {
  const accessTokenDoc = await Token.findOne({
    token: accessToken,
    type: tokenTypes.ACCESS,
    blacklisted: false,
  });
  if (accessTokenDoc) {
    await accessTokenDoc.deleteOne();
  }
};
/**
 * Reset password
 * @param {string} resetPasswordToken
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export const resetPassword = async (
  resetPasswordToken: any,
  newPassword: string,
): Promise<IUserDoc | null> => {
  try {
    const resetPasswordTokenDoc = await verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);

    const user = await getUserById(new mongoose.Types.ObjectId(resetPasswordTokenDoc.user));

    if (!user) {
      throw new Error();
    }
    await updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
    return user;
  } catch (error) {
    console.log(error.message);
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

/**
 * Verify email
 * @param {string} verifyEmailToken
 * @returns {Promise<IUserDoc | null>}
 */
export const verifyEmail = async (verifyEmailToken: any): Promise<IUserDoc | null> => {
  try {
    const verifyEmailTokenDoc = await verifyToken(verifyEmailToken, tokenTypes.VERIFY_EMAIL);
    const user = await getUserById(new mongoose.Types.ObjectId(verifyEmailTokenDoc.user));
    if (!user) {
      throw new Error();
    }
    await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    const updatedUser = await updateUserById(user.id, { status: 'active' });
    return updatedUser;
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Email verification failed');
  }
};

/**
 * forgot password
 * @param {string} verifyEmailToForgotPassword
 * @returns {Promise<IUserDoc | null>}
 */
export const forgotPassword = async (email: string): Promise<IUserDoc | null> => {
  const user = await getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `Please enter your registered email address.`);
  }
  if (!user.authProviders.includes(userConstants.authProviders.EMAIL)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User associated with social account');
  }
  return user;
};

export const verifyUserCode = async (token: string, code: number): Promise<IUserDoc | null> => {
  const deleteToken = await tokenService.verifyBareerTokenAndCode(token, code);
  const user = userService.getUserById(new Types.ObjectId(deleteToken.value.user));
  return user;
};

export const spliceToken = (token: string) => token.split(' ')[1];

export const resetPasswordByToken = async (
  token: string,
  password: string,
): Promise<IUserDoc | null> => {
  const tokenData = await verifyToken(spliceToken(token), tokenTypes.RESET_PASSWORD);
  const user = await userService.updateUserById(new Types.ObjectId(tokenData.user), { password });
  return user;
};
