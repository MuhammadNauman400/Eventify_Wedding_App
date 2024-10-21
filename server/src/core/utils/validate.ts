import { CustomHelpers } from 'joi';

export const password = (value: string, helpers: CustomHelpers) => {
  if (value.length < 5) {
    return helpers.message({
      custom: 'password must be at least 6 characters',
    });
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: 'password must contain at least 1 letter and 1 number',
    });
  }
  return value;
};
