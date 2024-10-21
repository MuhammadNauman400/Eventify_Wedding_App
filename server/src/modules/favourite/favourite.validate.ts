import Joi from 'joi';

export const addFavItem = {
  body: Joi.object().keys({
    type: Joi.string().valid('service').required(),
    item: Joi.string().required(),
  }),
};

export const getFavItems = {
  query: Joi.object().keys({
    type: Joi.string().valid('service').allow(''),
  }),
};

export const getFavItemsDetails = {
  query: Joi.object().keys({
    type: Joi.string().valid('service').required(),
  }),
};
