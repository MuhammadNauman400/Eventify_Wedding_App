import mongoose from 'mongoose';
import { tokenTypes } from './token.constants';
import { toJSON } from '@modules/to_json';
import { ITokenDoc, ITokenModel } from './token.interfaces';
import { userModel } from '@modules/user';

const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    user: {
      type: String,
      ref: userModel,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(tokenTypes),
      required: true,
    },
    code: Number,
    expires: {
      type: Date,
      required: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token = mongoose.model<ITokenDoc, ITokenModel>('tokens', tokenSchema);

export default Token;
