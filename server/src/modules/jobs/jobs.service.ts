import Jobs from './jobs.model';
import { CreateJob, IJobDoc, IJobModel } from './jobs.interfaces';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import { Types } from 'mongoose';
import { ApiError } from '@core/errors';
import httpStatus from 'http-status';

/**
 * @param {CreateJob} jobBody
 * @param {string} userId
 * @returns {Promise<IJobDoc>}
 */
export const createJob = async (jobBody: CreateJob, userId: string): Promise<IJobDoc> => {
  const job = await Jobs.create({ ...jobBody, createdBy: userId });
  await job.populate([
    { path: 'category', select: 'name slug' },
    { path: 'createdBy', select: 'name email' },
  ]);
  return job;
};

/**  
  @param {Record<Object>} filter - Mongo filter
  @param {Object} options - Query options
  @returns {Promise<QueryResult>} 
*/
export const getJobs = (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
  options = {
    ...options,
    populate: 'createdBy, category',
    select: 'createdBy:name email, category:name slug',
  };
  return Jobs.paginate(filter, options);
};

export const getJobById = (id: Types.ObjectId): Promise<IJobDoc> => {
  const job = Jobs.findById(id).populate('createdBy');
  if (!job) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Job not found');
  }
  return job;
};
