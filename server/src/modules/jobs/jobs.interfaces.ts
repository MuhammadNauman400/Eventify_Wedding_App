import { Document, Model } from 'mongoose';
import { QueryResult } from '@modules/paginate/paginate';
interface IJob {
  title: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  category: string;
  address: string;
  lat: number;
  lng: number;
  createdBy: string;
}

export interface IJobDoc extends IJob, Document {}
export interface IJobModel extends Model<IJobDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type CreateJob = Omit<IJob, 'createdBy'>;
