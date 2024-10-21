import httpStatus from 'http-status';
import * as favouriteService from './favourite.service';
import { catchAsync } from '@core/utils';
import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { authInterfaces } from '@modules/auth';

export const addFavItem = catchAsync(async (req: authInterfaces.AuthReq, res: Response) => {
  const favBody: any = req.body;
  const favourite = await favouriteService.addFavItem(req.user.id, favBody);
  res.status(httpStatus.CREATED).json({
    status: true,
    favourite,
  });
});

export const getFavItems = catchAsync(async (req: authInterfaces.AuthReq, res: Response) => {
  const userId = req.user.id;
  const queryParams: any = req.query;
  const favourites = await favouriteService.getFavItems(userId, queryParams);
  res.status(httpStatus.OK).json({
    status: true,
    favourites,
  });
});

export const getFavItemsDetails = catchAsync(async (req: authInterfaces.AuthReq, res: Response) => {
  const userId = req.user.id;
  const page: number = Number(req.query.page);
  const limit: number = Number(req.query.limit);
  const queryParams: any = req.query;
  const filters = {
    user: userId,
    type: queryParams.type,
  };
  const options = {
    page,
    limit,
    populate: 'item',
  };
  const favourites = await favouriteService.queryFavItems(filters, options);
  res.status(httpStatus.OK).json({
    status: true,
    favourites,
  });
});
