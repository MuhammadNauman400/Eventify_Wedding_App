import mongoose from 'mongoose';
import { categoryModal } from './category.constants';
import { toJSON } from '@modules/to_json';
import { paginate } from '@modules/paginate';
import { ICategoryDoc, ICategoryModel } from './category.interfaces';

const schema = new mongoose.Schema<ICategoryDoc, ICategoryModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  slug: {
    type: String,
    required: true,
  },
  parent: {
    type: String,
    ref: categoryModal,
    default: '',
  },
  isMenu: {
    type: Boolean,
    default: true,
  },
});

// add plugin that converts mongoose to json
schema.plugin(toJSON);
schema.plugin(paginate);

const model = mongoose.model<ICategoryDoc, ICategoryModel>(categoryModal, schema);
export default model;
