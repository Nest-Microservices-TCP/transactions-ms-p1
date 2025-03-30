import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PaymentsTypesService } from './payments-types.service';
import { PaymentsTypesController } from './payments-types.controller';
import { PaymentsTypesRepository } from './repository/payments-types.repository';

import { PaymentType } from './entity/payment-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentType])],
  providers: [PaymentsTypesRepository, PaymentsTypesService],
  controllers: [PaymentsTypesController],
})
export class PaymentsTypesModule {}
