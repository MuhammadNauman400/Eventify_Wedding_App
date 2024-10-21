import { Model, Document } from 'mongoose';
import { QueryResult } from '@modules/paginate/paginate';

export interface IFavourite {
  user: string;
  type: string;
  item: string;
  onModel: string;
  addOn: Date | null;
}

export interface IFavouriteDoc extends IFavourite, Document {}
export interface IFavouriteModel extends Model<IFavouriteDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type NewFavourite = Omit<IFavourite, 'user'>;
export type UpdateFavourite = Partial<IFavourite>;

export interface IFavouriteItem {
  type: string;
  id: string;
}

export type NewFavouriteItem = Required<IFavouriteItem>;
export type QueryFavouriteItems = Pick<IFavourite, 'type'>;
