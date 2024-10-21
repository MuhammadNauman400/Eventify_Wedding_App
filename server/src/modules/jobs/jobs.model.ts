import mongoose from 'mongoose';

import { userModel } from '@modules/user';
import { toJSON } from '@modules/to_json';
import { jobModel } from './jobs.constants';
import { paginate } from '@modules/paginate';
import { categoryModal } from '@modules/category';
import { IJobDoc, IJobModel } from './jobs.interfaces';

const schema = new mongoose.Schema<IJobDoc, IJobModel>(
  {
    title: String,
    description: String,
    minPrice: Number,
    maxPrice: Number,
    category: {
      type: String,
      ref: categoryModal,
    },
    address: String,
    lat: Number,
    lng: Number,
    createdBy: {
      type: String,
      ref: userModel,
    },
  },
  { timestamps: true },
);

schema.plugin(toJSON);
schema.plugin(paginate);

const model = mongoose.model<IJobDoc, IJobModel>(jobModel, schema);
export default model;
