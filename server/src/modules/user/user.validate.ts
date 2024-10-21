import Joi from 'joi';

export const updateProfile = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    dob: Joi.string(),
    gender: Joi.string(),
    address: {
      country: Joi.string(),
      city: Joi.string(),
    },
  }),
};
export const updateEmail = {
  body: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
  }),
};

export const resetPassword = {
  body: Joi.object().keys({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().required(),
  }),
};

export const notificationAlert = {
  body: Joi.object().keys({
    allowNotify: Joi.boolean().required(),
  }),
};

export const getUsers = {
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    username: Joi.string().allow('').default(''),
  }),
};

export const updateUser = {
  body: Joi.object().keys({
    status: Joi.string(),
  }),
};

export const updateFav = {
  body: Joi.object().keys({
    fav: Joi.array().default([]).items(Joi.string()).required(),
  }),
};
