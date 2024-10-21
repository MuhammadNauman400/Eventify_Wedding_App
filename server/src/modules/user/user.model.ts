import mongoose, { Schema, Types, model } from 'mongoose';
import { IUserDoc, IUserModel } from './user.interfaces';
import bcrypt from 'bcryptjs';
import { authProviders } from './user.constants';

import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';

import { userModel, userRoles } from './user.constants';

const schema: Schema = new Schema(
  {
    name: String,
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      private: true,
    },
    authProviders: {
      type: Array,
      default: [authProviders.EMAIL],
    },
    address: {
      country: String,
      city: String,
    },
    allowNotify: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      default: 'active',
    },
    role: {
      type: String,
      enum: Object.values(userRoles),
      default: userRoles.BUYER,
    },
    phone: {
      type: String,
      default: '',
    },
    lastLogin: {
      type: Date || String,
      default: '',
    },
  },
  { timestamps: true },
);

// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
schema.static(
  'isEmailTaken',
  async function (email: string, excludeUserId: mongoose.ObjectId): Promise<boolean> {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
    return !!user;
  },
);

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
schema.method('isPasswordMatch', async function (password: string): Promise<boolean> {
  const user = this;
  return bcrypt.compare(password, user.password);
});

schema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
    user.lastPasswordUpdate = new Date();
  }
});

const user = mongoose.model<IUserDoc, IUserModel>(userModel, schema);
export default user;
