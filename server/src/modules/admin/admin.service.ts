import { NewCreatedAdmin, IAdminDoc, UpdateAdminBody } from './admin.interfaces';
import httpStatus from 'http-status';
import mongoose, { Types } from 'mongoose';
import Admin from './admin.model';
import { ApiError } from '@core/errors';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import { authStatus } from './admin.constants';

/**
 * Create an admin
 * @param {NewCreatedAdmin} adminBody
 * @returns {Promise<IAdminDoc>}
 */
export const createdAdmin = async (adminBody: NewCreatedAdmin): Promise<IAdminDoc> => {
  if (await Admin.isEmailTaken(adminBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return Admin.create(adminBody);
};

/**
 * Query for admins
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @returns {Promise<QueryResult>}
 */
export const queryAdmins = async (
  filter: Record<string, any>,
  options: IOptions,
): Promise<QueryResult> => {
  const admins = await Admin.paginate(filter, options);
  return admins;
};

/**
 * Get admin by email
 * @param {string} email
 * @returns {Promise<IAdminDoc | null>}
 */
export const getAdminByEmail = async (email: string): Promise<IAdminDoc | null> =>
  Admin.findOne({ email });

/**
 * Get admin by Id
 * @param {Types.ObjectId} adminId
 * @returns {Promise<IAdminDoc | null>}
 */
export const getAdminById = async (adminId: Types.ObjectId): Promise<IAdminDoc | null> =>
  Admin.findById(adminId);

/**
 * Get admin by Id
 * @param {IAdminDoc} admin
 * @returns {Promise<IAdminDoc | null>}
 */
export const updateAdmin = async (
  admin: IAdminDoc,
  updateBody: UpdateAdminBody,
): Promise<IAdminDoc | null> => {
  Object.assign(admin, updateBody);
  await admin.save();
  return admin;
};

/**
 * delete admin by Id
 * @param {IAdminDoc} admin
 * @returns {Promise<IAdminDoc | null>}
 */
export const deleteAdmin = async (adminId: Types.ObjectId): Promise<IAdminDoc | null> => {
  return (await Admin.findByIdAndDelete(adminId)).value;
};

/**
 * Login with email and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<IAdminDoc>}
 */
export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<IAdminDoc> => {
  const admin = await getAdminByEmail(email);
  if (!admin || !(await admin.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (admin.status == authStatus.SUSPENDED) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Your account has been suspended. Contact Support');
  }
  if (admin.status == authStatus.PENDING) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      'Your account status is pending. You will get notified soon.',
    );
  }
  return admin;
};
