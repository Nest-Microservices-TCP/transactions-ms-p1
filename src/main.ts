import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Transactions-MS');

  // Iniciar la comunicación TCP
  const tcpApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: envs.host,
        port: envs.port,
      },
    },
  );

  tcpApp.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
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

  await tcpApp.listen();
  logger.log(`Transactions Microservice listen on port ${envs.port}`);

  await kafkaApp.listen();
  logger.log(`Transactions Microservice connected to Kafka`);
}
bootstrap();
