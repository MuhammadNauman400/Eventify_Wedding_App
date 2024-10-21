import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import User from './user.model';
import { ApiError } from '@core/errors';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import { NewCreatedUser, UpdateUserBody, NewRegisteredSocialUser, IUserDoc, NewRegisteredUser } from './user.interfaces';
import { userConstants } from '.';
import { userRoles, authStatus } from './user.constants';

/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  // if (userBody.role === userRoles.VENDOR) {
  //   Object.assign(userBody, { status: authStatus.PENDING });
  // }
  return User.create(userBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {mongoose.Types.ObjectId} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

/**
 * Get user details
 * @param {string} id
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserDetailsById = async (id: string): Promise<IUserDoc> => {
  const user = await getUserById(new Types.ObjectId(id));
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, `User not found`);
  }
  return user;
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<IUserDoc | null>}
 */
export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (userId: mongoose.Types.ObjectId, updateBody: UpdateUserBody): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Update user by id
 * @param {IUserDoc} user
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUser = async (user: IUserDoc, updateBody: UpdateUserBody): Promise<IUserDoc | null> => {
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<IUserDoc | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.deleteOne();
  return user;
};

/**
 * Reset user password
 * @param {IUserDoc} user
 * @returns {Promise<IUserDoc | null>}
 */
export const resetPassword = async (user: IUserDoc, currentPassword: string, newPassword: string): Promise<IUserDoc> => {
  if (!(await user.isPasswordMatch(currentPassword))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password');
  }
  return await updateUser(user, { password: newPassword });
};
