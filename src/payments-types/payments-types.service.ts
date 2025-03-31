import { Injectable } from '@nestjs/common';
import { HandleRpcExceptions } from 'src/common/decorators';

import {
  CreatePaymentTypeRequest,
  FindOnePaymentTypeRequest,
  FindPaymentsTypesResponse,
} from 'src/grpc/proto/transactions/payments_types.pb';

import { PaymentsTypesRepository } from './repository/payments-types.repository';

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
  async findOne(request: FindOnePaymentTypeRequest): Promise<PaymentType> {
    const { payment_type_id } = request;

    return this.paymentsTypesRepository.findOne(payment_type_id);
  }

  @HandleRpcExceptions()
  async find(): Promise<FindPaymentsTypesResponse> {
    const payments_types = await this.paymentsTypesRepository.findAll();

    return { payments_types };
  }
}
