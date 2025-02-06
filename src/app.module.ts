import { Module } from '@nestjs/common';

import { PostgresConfigModule } from './database/postgres.config.module';

import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [PaymentsModule, PostgresConfigModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
