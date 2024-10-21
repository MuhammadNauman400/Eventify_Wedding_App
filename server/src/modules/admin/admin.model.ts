import mongoose, { Schema, Types, model } from 'mongoose';
import { IAdminDoc, IAdminModel } from './admin.interfaces';
import bcrypt from 'bcryptjs';

import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';
import { adminRoles, modelName, authStatus, defaultProfile } from './admin.constants';

const schema: Schema = new Schema<IAdminDoc, IAdminModel>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
    },
    profileImg: {
      type: String,
      default: defaultProfile,
    },
    role: {
      type: String,
      enum: Object.values(adminRoles),
      default: adminRoles.ADMIN,
    },
    status: {
      type: String,
      enum: Object.values(authStatus),
      default: authStatus.ACTIVE,
    },
    password: {
      type: String,
      trim: true,
      private: true,
    },
    lastPasswordUpdate: {
      type: Date || null,
      default: null,
    },
    lastLogin: {
      type: Date || null,
      default: null,
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The admin's email
 * @param {ObjectId} [excludeadminId] - The id of the admin to be excluded
 * @returns {Promise<boolean>}
 */
schema.static(
  'isEmailTaken',
  async function (email: string, excludeadminId: mongoose.ObjectId): Promise<boolean> {
    const admin = await this.findOne({ email, _id: { $ne: excludeadminId } });
    return !!admin;
  },
);

/**
 * Check if password matches the admin's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
schema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const admin = this;
  return bcrypt.compare(password, admin.password);
});

schema.pre('save', async function (next) {
  const admin = this;
  if (admin.isModified('password')) {
    admin.password = await bcrypt.hash(admin.password, 8);
    admin.lastPasswordUpdate = new Date();
  }
});

const admin = mongoose.model<IAdminDoc, IAdminModel>(modelName, schema);
export default admin;
