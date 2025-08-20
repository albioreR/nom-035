import Joi from 'joi';

export const joiValidate = Joi.object({
  PORT: Joi.number().port().default(3000),
  NODE_ENV: Joi.valid('prod', 'development', 'qas').default('development'),
  SECRET_KEY: Joi.required(),
  EXPIRES_TIME: Joi.required(),
  EMAIL_FROM: Joi.required(),
  EMAIL_PASSWORD: Joi.required(),
  EMAIL_SERVICE: Joi.required(),
  EMAIL_PORT: Joi.required(),
  EMAIL_SECURE: Joi.required(),
  DATABASE_URL: Joi.required(),
  FIREBASE_APIKEY: Joi.required(),
  FIREBASE_AUTHDOMAIN: Joi.required(),
  FIREBASE_PROJECTID: Joi.required(),
  FIREBASE_STORAGEBUCKET: Joi.required(),
  FIREBASE_MESSAGINGSENDERID: Joi.required(),
  FIREBASE_APPID: Joi.required(),
  FIREBASE_MEASUREMENTID: Joi.required(),
  FIREBASE_API: Joi.required(),
});
