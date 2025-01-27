import Joi from 'joi';
import httpStatus from 'http-status';
import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@core/errors';
import { ValidationSchema } from '@core/interfaces/validationSchema';
/*
 * Validate request according to the defined validation Schema (see `validations` directory)
 * The request's body, params or query properties may be checked only.
 * An operational AppError is thrown if data validation fails.
 * In case of success, go to the next middleware
 */
const validate =
  (schema: ValidationSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    /* eslint-disable */
    const pickObjectKeysWithValue = (Object: object, Keys: string[]) =>
      Keys.reduce((o, k) => ((o[k] = Object[k]), o), {});
    /* eslint-enable */
    const definedSchemaKeys = Object.keys(schema);
    const acceptableSchemaKeys: string[] = ['params', 'query', 'body'];
    const filterOutNotValidSchemaKeys: string[] = Object.keys(schema).filter(
      (k) => acceptableSchemaKeys.includes(k),
    );
    if (filterOutNotValidSchemaKeys.length !== definedSchemaKeys.length) {
      const e = `Wrongly defined validation Schema keys: [${definedSchemaKeys}], allowed keys: [${acceptableSchemaKeys}]`;
      throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, e);
    }
    const validSchema = pickObjectKeysWithValue(
      schema,
      filterOutNotValidSchemaKeys,
    );
    const object = pickObjectKeysWithValue(req, Object.keys(validSchema));
    const { value, error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' } })
      .validate(object);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ');
      return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
    }
    Object.assign(req, value);
    return next();
  };

export default validate;
