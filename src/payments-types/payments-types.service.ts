import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { PaymentsTypesRepository } from './repository/payments-types.repository';
import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';

import { PaymentType } from './entity/payment-type.entity';

@Injectable()
export class PaymentsTypesService {
  constructor(
    private readonly paymentsTypesRepository: PaymentsTypesRepository,
  ) {}

  @HandleRpcExceptions()
  async save(request: CreatePaymentTypeRequest): Promise<void> {
    await this.paymentsTypesRepository.save(request);
  }

  @HandleRpcExceptions()
  async findOne(payment_type_id: string): Promise<PaymentType> {
    return this.paymentsTypesRepository.findOne(payment_type_id);
  }
}
