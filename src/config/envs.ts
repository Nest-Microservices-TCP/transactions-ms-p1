import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;

  RABBITMQ_HOST: string;
  RABBITMQ_PORT: number;
  RABBITMQ_USER: string;
  RABBITMQ_PASSWORD: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    HOST: joi.string().required(),

    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_NAME: joi.string().required(),

    RABBITMQ_HOST: joi.string().required(),
    RABBITMQ_PORT: joi.number().required(),
    RABBITMQ_USER: joi.string().required(),
    RABBITMQ_PASSWORD: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  host: envVars.HOST,

  dbHost: envVars.DB_HOST,
  dbPort: envVars.DB_PORT,
  dbPassword: envVars.DB_PASSWORD,
  dbUsername: envVars.DB_USERNAME,
  dbName: envVars.DB_NAME,

  rabbitMqHost: envVars.RABBITMQ_HOST,
  rabbitMqPort: envVars.RABBITMQ_PORT,
  rabbitMqUser: envVars.RABBITMQ_USER,
  rabbitMqPassword: envVars.RABBITMQ_PASSWORD,
};
