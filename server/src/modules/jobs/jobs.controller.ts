import { Request, Response } from 'express';
import * as jobService from './jobs.service';
import { AuthReq } from '@modules/auth';
import { catchAsync } from '@core/utils';
import httpStatus from 'http-status';

// post user job
export const createJob = catchAsync(async (req: AuthReq, res: Response) => {
  const job = await jobService.createJob(req.body, req.user.id);
  res.status(httpStatus.CREATED).json({
    status: true,
    job,
  });
});

// get user jobs
export const getJobs = catchAsync(async (req: AuthReq, res: Response) => {
  const filters = {
    createdBy: req.user.id,
  };
  const jobs = await jobService.getJobs(filters, req.query);
  res.status(httpStatus.OK).json({
    status: true,
    jobs,
  });
});

// public query for jobs
export const queryJobs = catchAsync(async (req: Request, res: Response) => {
  const searchText = req.query.search as string;
  const filters = {
    $or: [{ title: { $regex: new RegExp(searchText, 'i') } }],
  };
  const jobs = await jobService.getJobs(filters, req.query);
  res.status(httpStatus.OK).json({
    status: true,
    jobs,
  });
});

// public latest rated jobs
export const latestJobs = catchAsync(async (req: Request, res: Response) => {
  const jobs = await jobService.getJobs({}, { page: 1, limit: 6, sortBy: 'createdAt:desc' });
  res.status(httpStatus.OK).json({
    status: true,
    jobs,
  });
});
