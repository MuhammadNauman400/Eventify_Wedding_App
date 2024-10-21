import mongoose from 'mongoose';
import { IFavouriteDoc, IFavouriteModel } from './favourite.interfaces';
import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';
import { modelName } from './favourite.constants';

import { userModel } from '@modules/user';
import { serviceModelName } from '@modules/marketplace';

const schema = new mongoose.Schema<IFavouriteDoc, IFavouriteModel>({
  user: {
    type: String,
    required: true,
    //  ref: userModel,
  },
  type: {
    type: String,
    required: true,
    enum: [serviceModelName],
  },
  item: {
    type: String,
    refPath: 'onModel',
    required: true,
  },
  onModel: {
    type: String,
    required: true,
    enum: [serviceModelName],
  },
  addOn: {
    type: Date,
    default: Date.now(),
  },
});

schema.plugin(toJSON);
schema.plugin(paginate);

const model = mongoose.model<IFavouriteDoc, IFavouriteModel>(modelName, schema);
export default model;
