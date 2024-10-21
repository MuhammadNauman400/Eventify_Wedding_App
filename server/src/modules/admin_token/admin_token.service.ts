import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '@config/config';
import Token from './admin_token.model';
import { ApiError } from '@core/errors';
import { tokenTypes } from './admin_token.constants';
import { AccessToken, ITokenDoc } from './admin_token.interfaces';
import { IAdminDoc } from '../admin/admin.interfaces';

/**
 * Generate token
 * @param {mongoose.Types.ObjectId} adminId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
export const generateToken = (
  adminId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  secret: string = config.jwt.secret,
): string => {
  const payload = {
    sub: adminId,
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
  adminId: mongoose.Types.ObjectId,
  expires: Moment,
  type: string,
  blacklisted: boolean = false,
  code?: number,
): Promise<ITokenDoc> => {
  const tokenDoc = await Token.create({
    token,
    admin: adminId,
    expires: expires.toDate(),
    type,
    blacklisted,
    code,
  });
  return tokenDoc;
};

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<ITokenDoc>}
 */
export const verifyToken = async (token: string, type: string): Promise<ITokenDoc> => {
  const payload = jwt.verify(token, config.jwt.secret);
  if (typeof payload.sub !== 'string') {
    throw new ApiError(httpStatus.BAD_REQUEST, 'bad user');
  }
  const tokenDoc = await Token.findOne({
    token,
    type,
    admin: payload.sub,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new Error('Token not found');
  }
  return tokenDoc;
};

/**
 * Generate auth tokens
 * @param {IAdminDoc} admin
 * @returns {Promise<AccessToken>}
 */
export const generateAuthToken = async (admin: IAdminDoc): Promise<AccessToken> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationDays, 'days');
  const accessToken = generateToken(admin.id, accessTokenExpires, tokenTypes.ACCESS);
  await saveToken(accessToken, admin.id, accessTokenExpires, tokenTypes.ACCESS);
  return {
    accessToken: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};
