import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import {
  HttpExceptionsFilter,
  TypeORMExceptionsFilter,
} from './common/exceptions/filters';

import { envs } from './config';

import { TRANSACTIONS_PAYMENTS_TYPES_PACKAGE_NAME } from './grpc/transactions/payments_types.pb';

async function bootstrap() {
  const logger = new Logger('Transactions-MS');

  // Iniciar la comunicación gRPC
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${envs.host}:${envs.port}`,
        package: [TRANSACTIONS_PAYMENTS_TYPES_PACKAGE_NAME],
        protoPath: ['./proto-files/transactions/payments_types.proto'],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );

  grpcApp.useGlobalFilters(
    new HttpExceptionsFilter(),
    new TypeORMExceptionsFilter(),
  );

  // Iniciar la comunicación con RabbitMQ
  const rmqApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${envs.rabbitMqUser}:${envs.rabbitMqPassword}@${envs.rabbitMqHost}:${envs.rabbitMqPort}`,
        ],
        queue: envs.rmwTransactionsQueue,
        queueOptions: {
          durable: true,
        },
      },
    },
  );

  await grpcApp.listen();
  logger.log(
    `Transactions Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );

  await rmqApp.listen();
  logger.log(
    `Transactions Microservice connected to RabbitMQ on ${envs.rabbitMqHost}:${envs.rabbitMqPort}`,
  );
}
bootstrap();
