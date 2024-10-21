import { Types } from 'mongoose';

import { ApiError } from '@core/errors';
import Marketplace from './marketplace.model';
import { CreateService, IServiceDoc } from './marketplace.interfaces';
import { IOptions, QueryResult } from '@modules/paginate/paginate';
import httpStatus from 'http-status';

/**  
  @param {CreateService} serviceBody
  @returns {Promise<IServiceDoc>} 
*/
export const createService = (serviceBody: CreateService, createdBy: string): Promise<IServiceDoc> =>
  Marketplace.create({ ...serviceBody, createdBy });

/**  
  @param {Record<Object>} filter - Mongo filter
  @param {Object} options - Query options
  @returns {Promise<QueryResult>} 
*/
export const getServices = (filter: Record<string, any>, options: IOptions): Promise<QueryResult> =>
  Marketplace.paginate(filter, options);

export const getServiceById = (id: Types.ObjectId): Promise<IServiceDoc> => Marketplace.findById(id);

export const setService = async (service: IServiceDoc, body: any): Promise<IServiceDoc> => {
  Object.assign(service, body);
  return await service.save();
};

/**
 * @param {string} serviceId
 * @returns {IServiceDoc}
 */
export const getServiceDetailById = async (serviceId: Types.ObjectId): Promise<IServiceDoc> => {
  const service = await Marketplace.findById(serviceId).populate([
    { path: 'category' },
    { path: 'createdBy' },
    { path: 'subcategory' },
    { path: 'reviews.createdBy' },
  ]);
  if (!service) {
    throw new ApiError(httpStatus.NOT_FOUND, `Service not found`);
  }
  return service;
};
