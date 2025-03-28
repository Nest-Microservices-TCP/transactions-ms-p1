import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { envs } from './config';

import { TRANSACTIONS_PAYMENTS_TYPES_PACKAGE_NAME } from './grpc/proto/transactions/payments_types.pb';

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
        protoPath: ['./proto/transactions/payments_types.proto'],
        loader: {
          keepCase: true,
          enums: String,
          arrays: true,
        },
      },
    },
  );
  /**
   * Un topic en Kafka es básicamente un canal donde se publican y consumen
   * mensajes. Funciona como una especie de buzón donde los productores
   * envían mensajes y los consumidores los leen.
   *
   * Cada topic se divide en particiones, lo que permite escalabilidad y
   * distribución de mensajes entre multiples consumidores
   */
  // Iniciar la comunicación con Kafka
  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: envs.kafkaClientId,
          brokers: [envs.kafkaBroker],
          // logLevel: 5,
        },
        consumer: {
          groupId: envs.kafkaGroupId,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  await grpcApp.listen();
  logger.log(
    `Transactions Microservice running with gRPC on ${envs.host}:${envs.port}`,
  );

  await kafkaApp.listen();
  logger.log(`Transactions Microservice connected to Kafka`);
}
bootstrap();
