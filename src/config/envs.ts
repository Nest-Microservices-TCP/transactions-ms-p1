import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  HOST: string;

  KAFKA_BROKER: string;
  KAFKA_CLIENT_ID: string;
  KAFKA_GROUP_ID: string;

  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_NAME: string;
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

    KAFKA_BROKER: joi.string().required(),
    KAFKA_CLIENT_ID: joi.string().required(),
    KAFKA_GROUP_ID: joi.string().required(),
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

  kafkaBroker: envVars.KAFKA_BROKER,
  kafkaClientId: envVars.KAFKA_CLIENT_ID,
  kafkaGroupId: envVars.KAFKA_GROUP_ID,
};
