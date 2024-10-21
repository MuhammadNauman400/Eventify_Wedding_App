import mongoose from 'mongoose';
import { IServiceDoc, IServiceModel, IFaqDoc, IFaqModel } from './marketplace.interfaces';

import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';

import { serviceModelName } from './marketplace.constants';
import { categoryModal } from '@modules/category';
import { userModel } from '@modules/user';

const faqSchema = new mongoose.Schema<IFaqDoc, IFaqModel>(
  {
    question: String,
    answer: String,
  },
  { _id: false },
);

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      default: '',
    },
    createdBy: {
      type: String,
      ref: userModel,
    },
  },
  { _id: false, timestamps: true },
);

const serviceSchema = new mongoose.Schema<IServiceDoc, IServiceModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    ref: categoryModal,
  },
  subcategory: {
    type: String,
    ref: categoryModal,
  },
  location: {
    address: String,
    lat: Number,
    lng: Number,
  },
  createdBy: {
    type: String,
    ref: userModel,
  },
  faqs: {
    type: [faqSchema],
    default: [],
  },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
});

// add plugin that converts mongoose to json
serviceSchema.plugin(toJSON);
serviceSchema.plugin(paginate);

const service = mongoose.model<IServiceDoc, IServiceModel>(serviceModelName, serviceSchema);

export default service;
