import Joi from 'joi';

export const createJob = {
  body: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    minPrice: Joi.number().required(),
    maxPrice: Joi.number().required(),
    category: Joi.string().required(),
    address: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required(),
  }),
};

export const queryJobs = {
  query: Joi.object({
    page: Joi.number().default(1),
    limit: Joi.number().default(200),
    search: Joi.string().default('').allow(''),
  }),
};
