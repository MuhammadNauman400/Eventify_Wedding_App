import Joi from 'joi';
import { password } from '@core/utils/validate';
import { userRoles } from '@modules/user';

export const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required().lowercase(),
    address: Joi.object().required().keys({
      city: Joi.string().required(),
      country: Joi.string().required(),
    }),
    role: Joi.string()
      .valid(...Object.values(userRoles))
      .default(userRoles.BUYER),
    phone: Joi.string().default('').allow(''),
    password: Joi.string().required().custom(password),
  }),
};

export const logout = {
  body: Joi.object().keys({
    accessToken: Joi.string().required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

export const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required().lowercase(),
  }),
};

export const verifyCode = {
  body: Joi.object().keys({
    code: Joi.number().required(),
  }),
};

export const resetPassword = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

export const socialLogin = {
  body: Joi.object().keys({
    idToken: Joi.string().required(),
  }),
};

export const registerSocialAccount = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    gender: Joi.string().required(),
    dob: Joi.string().required(),
    address: Joi.object().required().keys({
      city: Joi.string().required(),
      country: Joi.string().required(),
    }),
    travelExperience: Joi.string().required(),
  }),
};

export const confirmEmail = {
  query: Joi.object().keys({
    email: Joi.string().required(),
  }),
};
