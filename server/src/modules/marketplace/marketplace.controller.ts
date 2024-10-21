import { Request, Response } from 'express';

import httpStatus from 'http-status';
import { Types } from 'mongoose';

import { AuthReq } from '@modules/auth/auth.interfaces';
import * as marketplaceService from './marketplace.service';
import { categoryService } from '@modules/category';
import { catchAsync } from '@core/utils';
import { ApiError } from '@core/errors';

export const addService = catchAsync((req: AuthReq, res: Response) => {
  const service = marketplaceService.createService(req.body, req.user.id);
  res.status(httpStatus.OK).json({
    status: true,
    service,
  });
});

export const getServices = catchAsync(async (req: Request, res: Response) => {
  const filter = {};
  const page = req.query.page as unknown as number;
  const limit = req.query.limit as unknown as number;
  const options = { page, limit };
  const services = await marketplaceService.getServices(filter, options);
  res.status(httpStatus.OK).json({ status: true, services });
});

export const getMyServices = catchAsync(async (req: AuthReq, res: Response) => {
  const filter = {
    createdBy: req.user.id,
  };
  const page = req.query.page as unknown as number;
  const limit = req.query.limit as unknown as number;
  const options = { page, limit };
  const services = await marketplaceService.getServices(filter, options);
  res.status(httpStatus.OK).json({ status: true, services });
});

export const getPopularServices = catchAsync(async (req: Request, res: Response) => {
  const filter = {};
  const options = {
    page: 1,
    limit: 6,
    sortBy: 'rating',
    populate: 'createdBy',
  };
  const services = await marketplaceService.getServices(filter, options);
  res.status(httpStatus.OK).json({ status: true, services });
});

export const getQueryServices = catchAsync(async (req: Request, res: Response) => {
  const categorySlug = req.query.category as unknown as string;
  const subcategorySlug = req.query.subcategory as unknown as string;
  const filter: any = {};
  if (subcategorySlug) {
    const subcategory = await categoryService.getCategoryBySlug(subcategorySlug);
    filter.subcategory = subcategory.id;
  }
  if (categorySlug) {
    const category = await categoryService.getCategoryBySlug(categorySlug);
    filter.category = category.id;
  }

  const options = {
    page: 1,
    limit: 20,
    sortBy: 'rating',
    populate: 'createdBy',
  };
  const getSerives = await marketplaceService.getServices(filter, options);
  res.status(httpStatus.OK).json({ status: true, services: getSerives });
});

export const getServiceDetail = catchAsync(async (req: Request, res: Response) => {
  const serviceId = req.params.serviceId;
  const service = await marketplaceService.getServiceDetailById(new Types.ObjectId(serviceId));
  res.status(httpStatus.OK).json({
    status: true,
    service,
  });
});

export const addServiceReview = catchAsync(async (req: AuthReq, res: Response) => {
  const serviceId = req.params.serviceId;
  const userId = req.user.id;

  const service = await marketplaceService.getServiceById(new Types.ObjectId(serviceId));
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Service not found');
  }
  const review = {
    rating: req.body.rating,
    comment: req.body.comment,
    createdBy: userId,
  };
  const updateService = marketplaceService.setService(service, { reviews: [...service.reviews, review] });
  res.status(httpStatus.OK).json({
    status: true,
    service: updateService,
  });
});
