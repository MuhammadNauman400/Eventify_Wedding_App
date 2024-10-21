import { Document, Model } from 'mongoose';

/*
  @@ category model
*/
export interface ICategory {
  name: string;
  description: string;
  icon: string;
  slug: string;
  parent: string;
  isMenu: boolean;
}

export type UpdateCategory = Omit<ICategory, 'slug'>;
export interface ICategoryDoc extends ICategory, Document {}
export interface ICategoryModel extends Model<ICategoryDoc> {}
