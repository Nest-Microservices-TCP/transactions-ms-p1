import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { HandleRpcExceptions } from 'src/common/decorators';

import { PaymentsRepository } from './repository/payments.repository';

import { Payment } from './entity/payment.entity';

import { PaymentResponseDto } from './dto/response';
import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/request';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  private plainToInstanceDto(data: unknown): any {
    return plainToInstance(PaymentResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async findAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepository.findAll();

    return this.plainToInstanceDto(payments);
  }

  @HandleRpcExceptions()
  async findOne(paymentId: string): Promise<PaymentResponseDto> {
    const payment = await this.paymentsRepository.findOne(paymentId);

    return this.plainToInstanceDto(payment);
  }

  @HandleRpcExceptions()
  async findByIds(paymentsIds: string[]): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepository.findByIds(paymentsIds);

    return this.plainToInstanceDto(payments);
  }

  @HandleRpcExceptions()
  async save(request: CreatePaymentDto): Promise<PaymentResponseDto> {
    const newPayment = await this.paymentsRepository.save(request);

    return this.plainToInstanceDto(newPayment);
  }

  @HandleRpcExceptions()
  async update(request: UpdatePaymentDto): Promise<PaymentResponseDto> {
    const { paymentId, ...rest } = request;

    const updatedPayment = await this.paymentsRepository.update(
      { paymentId },
      rest,
    );

    return this.plainToInstanceDto(updatedPayment);
  }

  @HandleRpcExceptions()
  async remove(paymentId: string): Promise<DeleteResultResponse> {
    const deleteResult = await this.paymentsRepository.remove(paymentId);

    return plainToInstance(DeleteResultResponse, deleteResult, {
      excludeExtraneousValues: true,
    });
  }

  @HandleRpcExceptions()
  async softDelete(request: { payment_id: string }): Promise<Payment> {
    const { payment_id } = request;

    return this.paymentsRepository.softDelete(payment_id);
  }
}
