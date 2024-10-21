import mongoose from 'mongoose';
import { tokenTypes } from './admin_token.constants';
import { toJSON } from '@modules/to_json';
import { ITokenDoc, ITokenModel } from './admin_token.interfaces';

import { adminConstants } from '@modules/admin';
import { modelName } from './admin_token.constants';

const tokenSchema = new mongoose.Schema<ITokenDoc, ITokenModel>(
  {
    token: {
      type: String,
      required: true,
      index: true,
    },
    admin: {
      type: String,
      // ref: adminConstants.modelName,
      required: true,
    },
    type: {
      type: String,
      enum: [
        tokenTypes.ACCESS,
        tokenTypes.REFRESH,
        tokenTypes.RESET_PASSWORD,
        tokenTypes.FORGOT_PASSWORD,
        tokenTypes.VERIFY_EMAIL,
      ],
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
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);

const Token = mongoose.model<ITokenDoc, ITokenModel>(modelName, tokenSchema);

export default Token;
