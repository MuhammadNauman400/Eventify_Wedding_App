import { IFavouriteDoc, NewFavourite, QueryFavouriteItems } from './favourite.interfaces';
import { Types } from 'mongoose';
import Favourite from './favourite.model';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import { serviceModelName } from '@modules/marketplace';

export const addFavItem = async (userId: Types.ObjectId, favBody: NewFavourite) => {
  const itemId = favBody.item;
  const itemType = favBody.type;
  let onModel: string = itemType;
  const findItem = await Favourite.findOne({ item: itemId, user: userId, type: itemType });
  if (findItem) {
    return findItem.deleteOne();
  } else {
    return Favourite.create({ user: userId, onModel, ...favBody });
  }
};

export const getFavItems = async (
  userId: Types.ObjectId,
  queryParams: QueryFavouriteItems,
): Promise<IFavouriteDoc[]> => {
  const favType = queryParams.type;
  const filters: any = { user: userId };
  if (favType) filters.type = favType;
  const favourites = Favourite.find(filters);
  return favourites;
};

export const queryFavItems = async (
  filter: Record<string, any>,
  options: IOptions,
): Promise<QueryResult> => {
  const favourites = Favourite.paginate(filter, options);
  return favourites;
};
