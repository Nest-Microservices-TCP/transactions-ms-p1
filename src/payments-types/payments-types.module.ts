import { Module } from '@nestjs/common';

import { PaymentsTypesService } from './payments-types.service';
import { PaymentsTypesRepository } from './repository/payments-types.repository';

@Module({
  providers: [PaymentsTypesRepository, PaymentsTypesService],
})
export class PaymentsTypesModule {}
