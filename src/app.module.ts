import { Module } from '@nestjs/common';

import { PostgresConfigModule } from './database/postgres.config.module';

import { PaymentsModule } from './payments/payments.module';
import { PaymentsTypesModule } from './payments-types/payments-types.module';

@Module({
  imports: [PaymentsModule, PostgresConfigModule, PaymentsTypesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
