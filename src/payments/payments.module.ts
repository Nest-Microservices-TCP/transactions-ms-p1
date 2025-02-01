import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Payment } from './entity/payment.entity';

import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './repository/payments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  providers: [PaymentsRepository, PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
