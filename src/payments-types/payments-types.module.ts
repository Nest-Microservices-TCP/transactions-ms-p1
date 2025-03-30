import { Module } from '@nestjs/common';

import { PaymentsTypesService } from './payments-types.service';
import { PaymentsTypesController } from './payments-types.controller';
import { PaymentsTypesRepository } from './repository/payments-types.repository';

@Module({
  providers: [PaymentsTypesRepository, PaymentsTypesService],
  controllers: [PaymentsTypesController],
})
export class PaymentsTypesModule {}
