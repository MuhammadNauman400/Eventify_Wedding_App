import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '@config/config';
import Token from './token.model';
import { ApiError } from '@core/errors';
import { tokenTypes } from './token.constants';
import { AccessToken, ITokenDoc } from './token.interfaces';
import { IUserDoc } from '../user/user.interfaces';
import { userConstants, userService } from '../user';

/**
 * Generate token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (
  userId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret,
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {mongoose.Types.ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<ITokenDoc>}
 */
export const saveToken = async (
  token: string,
  userId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  blacklisted: boolean = false,
  provider: string = userConstants.authProviders.EMAIL,
  code?: number,
): Promise<ITokenDoc> => {
  const tokenDoc = await Token.create({
    token,
    user: userId,
    expires: expires.toDate(),
    type,
    blacklisted,
    code,
    provider,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<ITokenDoc>}
 */
export const verifyToken = async (
  token: string,
  type: string,
): Promise<ITokenDoc> => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
  }
  const tokenDoc = await Token.findOne({
    token,
    type,
    user: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {IUserDoc} user
 * @returns {Promise<AccessToken>}
 */
export const generateAuthToken = async (
  user: IUserDoc,
): Promise<AccessToken> => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationDays,
    'days',
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS,
  );
  await saveToken(accessToken, user.id, accessTokenExpires, tokenTypes.ACCESS);
  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
export const generateResetPasswordToken = async (
  email: string,
): Promise<AccessToken> => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new ApiError(httpStatus.NO_CONTENT, '');
  }
  const expires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    'minutes',
  );
  const resetPasswordToken = generateToken(
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD,
  );
  await saveToken(
    resetPasswordToken,
    user.id,
    expires,
    tokenTypes.RESET_PASSWORD,
  );
  return {
    accessToken: {
      token: resetPasswordToken,
      expires: expires.toDate(),
    },
  };
};

/**
 * Generate forgot password token
 * @param {IUserDoc} user
 * @returns {Promise<AccessToken>}
 */
export const generateForgotPasswordTokenAndCode = async (
  user: IUserDoc,
  code: number,
): Promise<AccessToken> => {
  await Token.deleteMany({ user: user.id, type: tokenTypes.FORGOT_PASSWORD });
  const accessTokenExpires = moment().add(
    config.jwt.forgotPasswordExpirationMinutes,
    'minutes',
  );
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.FORGOT_PASSWORD,
  );
  await saveToken(
    accessToken,
    user.id,
    accessTokenExpires,
    tokenTypes.FORGOT_PASSWORD,
    false,
    userConstants.authProviders.EMAIL,
    code,
  );
  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};

/**
 * Generate verify email token
 * @param {IUserDoc} user
 * @returns {Promise<string>}
 */
export const generateVerifyEmailToken = async (
  user: IUserDoc,
): Promise<AccessToken> => {
  await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
  const expires = moment().add(
    config.jwt.verifyEmailExpirationMinutes,
    'minutes',
  );
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    tokenTypes.VERIFY_EMAIL,
  );
  await saveToken(verifyEmailToken, user.id, expires, tokenTypes.VERIFY_EMAIL);

  return {
    accessToken: {
      token: verifyEmailToken,
      expires: expires.toDate(),
    },
  };
};

/**
 * Generate verify email token
 * @param {IUserDoc} user
 * @returns {Promise<string>}
 */
export const generateSocialLoginVerificationToken = async (
  user: IUserDoc,
): Promise<AccessToken> => {
  await Token.deleteMany({ user: user.id, type: tokenTypes.SOCIAL_AUTH });
  const expires = moment().add(
    config.jwt.verifySocialLoginExpirationMinutes,
    'minutes',
  );
  const token = generateToken(user.id, expires, tokenTypes.SOCIAL_AUTH);
  await saveToken(token, user.id, expires, tokenTypes.SOCIAL_AUTH);
  return {
    accessToken: {
      token: token,
      expires: expires.toDate(),
    },
  };
};

export const verifyBareerTokenAndCode = async (
  bareerToken: string,
  code: number,
) => {
  const token = bareerToken.split(' ')[1];
  const authToken = await verifyToken(token, tokenTypes.FORGOT_PASSWORD);
  if (authToken.code !== code) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Verification code does not match',
    );
  }
  return Token.findByIdAndDelete(authToken.id);
};
