import Joi from 'joi';

export const addService = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    images: Joi.array().required(),
    category: Joi.string().required(),
    subcategory: Joi.string().required(),
    location: Joi.object().keys({
      address: Joi.string(),
      lat: Joi.number().default(0),
      lng: Joi.number().default(0),
    }),
    faqs: Joi.array().required(),
  }),
};

export const getServices = {
  query: Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(500),
  }),
};
