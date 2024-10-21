import httpStatus from 'http-status';
import { categoryService } from '.';
import { catchAsync } from '@core/utils';
import { Request, Response } from 'express';

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const category = await categoryService.addCategory(req.body);
  res.status(httpStatus.CREATED).json({
    status: true,
    category,
  });
});

export const getCategories = catchAsync(async (req: Request, res: Response) => {
  const parent = req.query.parent.toString();
  const sub = req.query.sub as unknown as boolean;
  const categories = await categoryService.getCategories(parent, sub);
  res.status(httpStatus.OK).json({
    status: true,
    categories,
  });
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const categories = await categoryService.getAllCategories();
  res.status(httpStatus.OK).json({
    status: true,
    categories,
  });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const category = await categoryService.updateCategory(categoryId, req.body);
  res.status(httpStatus.OK).json({
    status: true,
    category,
  });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const categoryId = req.params.categoryId;
  const category = await categoryService.deleteCategory(categoryId);
  res.status(httpStatus.OK).json({
    status: true,
    category,
  });
});
