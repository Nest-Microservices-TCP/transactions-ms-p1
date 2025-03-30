import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';

import { PaymentsTypesRepository } from './repository/payments-types.repository';

@Injectable()
export class PaymentsTypesService {
  constructor(
    private readonly paymentsTypesRepository: PaymentsTypesRepository,
  ) {}

  @HandleRpcExceptions()
  async save(request: CreatePaymentTypeRequest): Promise<void> {
    await this.paymentsTypesRepository.save(request);
  }
}
