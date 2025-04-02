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

  @HandleRpcExceptions()
  async findByIds(request: { payments_types_ids: string[] }): Promise<{
    payments_types: PaymentType[];
  }> {
    const { payments_types_ids } = request;

    const payments_types =
      await this.paymentsTypesRepository.findByIds(payments_types_ids);

    return { payments_types };
  }

  @HandleRpcExceptions()
  async softDelete(request: { payment_type_id: string }): Promise<PaymentType> {
    const { payment_type_id } = request;

    return this.paymentsTypesRepository.softDelete(payment_type_id);
  }
}
