import Joi from 'joi';
import { adminRoles, authStatus, defaultProfile, profileActionTypes } from './admin.constants';

export const createAdmin = {
  body: Joi.object().keys({
    fullName: Joi.string().required().lowercase(),
    email: Joi.string().email().required().lowercase(),
    profileImg: Joi.string().allow('').empty('').default(defaultProfile),
    role: Joi.string().required().valid(adminRoles.ADMIN),
    status: Joi.string()
      .required()
      .valid(authStatus.ACTIVE, authStatus.PENDING, authStatus.SUSPENDED),
    password: Joi.string().required(),
  }),
};

export const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required().trim(),
  }),
};

export const queryAdmins = {
  query: Joi.object().keys({
    limit: Joi.number(),
    page: Joi.number(),
    authStatus: Joi.string()
      .valid(authStatus.ACTIVE, authStatus.PENDING, authStatus.SUSPENDED)
      .empty('')
      .default(''),
    role: Joi.string().valid(adminRoles.ADMIN).empty('').default(''),
  }),
};

export const updateAdmin = {
  body: Joi.object().keys({
    actionType: Joi.string()
      .valid(
        profileActionTypes.ACCOUNT_STATUS,
        profileActionTypes.ROLE,
        profileActionTypes.PASSWORD,
      )
      .required(),
    status: Joi.string().when('actionType', {
      is: profileActionTypes.ACCOUNT_STATUS,
      then: Joi.required().valid(authStatus.ACTIVE, authStatus.PENDING, authStatus.SUSPENDED),
      otherwise: Joi.optional().empty('').default(''),
    }),
    role: Joi.string().when('actionType', {
      is: profileActionTypes.ROLE,
      then: Joi.required().valid(adminRoles.ADMIN),
      otherwise: Joi.optional().empty('').default(''),
    }),
    password: Joi.string().when('actionType', {
      is: profileActionTypes.PASSWORD,
      then: Joi.required(),
      otherwise: Joi.optional().empty('').default(''),
    }),
  }),
};
