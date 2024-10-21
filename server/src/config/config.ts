import Joi from 'joi';
import 'dotenv/config';

// All env variables used by the app should be defined in this file.

// To define new env:
// 1. Add env variable to .env.local file;
// 2. Provide validation rules for your env in envsSchema;
// 3. Make it visible outside of this module in export section;
// 4. Access your env variable only via config file.
// Do not use process.env object outside of this file.

const envsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'integration', 'development').required(),
    APP_NAME: Joi.string().required().description('App name must required'),
    PORT: Joi.number().default(8080),
    API_KEY_TOKEN: Joi.string().required(),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_DAYS: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_FORGOT_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which forgot password token expires'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(10)
      .description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().required().description('Email from required.'),
    SESSION_SECRET: Joi.string().description('your session key required'),
  })
  .unknown(true);

const { value: envVars, error } = envsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(
    `Config validation error: ${error.message}. \n
     This app requires env variables to work properly.`,
  );
}

// map env vars and make it visible outside module
export default {
  env: envVars.NODE_ENV,
  appName: envVars.APP_NAME,
  port: envVars.PORT,
  xApiKey: envVars.API_KEY_TOKEN,
  mongodbUrl: envVars.MONGODB_URL,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationDays: envVars.JWT_ACCESS_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    forgotPasswordExpirationMinutes: envVars.JWT_FORGOT_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    verifySocialLoginExpirationMinutes: envVars.JWT_VERIFY_SOCIAL_LOGIN_EXPIRATION_MINUTES,
    cookieOptions: {
      httpOnly: true,
      secure: envVars.NODE_ENV === 'production',
      signed: true,
    },
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  session: {
    secret: envVars.SESSION_SECRET,
  },
};
