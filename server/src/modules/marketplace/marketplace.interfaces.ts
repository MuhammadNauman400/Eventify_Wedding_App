import { Document, Model, Types } from 'mongoose';
import { QueryResult } from '@modules/paginate/paginate';

interface IFaq {
  question: string;
  answer: string;
}

interface IReview {
  rating: number;
  comment: string;
  createdBy: string;
}

export interface IFaqDoc extends IFaq, Document {}
export interface IFaqModel extends Model<IFaqDoc> {}

interface IService {
  name: string;
  description: string;
  images: string[];
  category: string;
  subcategory: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  createdBy: string;
  faqs?: IFaq[];
  rating: number;
  reviews: IReview[];
}

export interface IServiceDoc extends IService, Document {}
export interface IServiceModel extends Model<IServiceDoc> {
  paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}

export type CreateService = Omit<IService, 'rating'>;
