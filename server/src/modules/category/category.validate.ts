import Joi from 'joi';

export const addCategory = {
  body: Joi.object().keys({
    name: Joi.string().trim().required().allow(''),
    description: Joi.string().allow('').default(''),
    icon: Joi.string().allow('').default(''),
    parent: Joi.string().allow('').default(''),
    isMenu: Joi.boolean().default(true),
  }),
};

export const updateCategory = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    icon: Joi.string().required().allow(''),
    parent: Joi.string().allow('').default(''),
  }),
};

export const getCategories = {
  query: Joi.object().keys({
    parent: Joi.string().required().allow(''),
    sub: Joi.bool().default(false),
  }),
};
