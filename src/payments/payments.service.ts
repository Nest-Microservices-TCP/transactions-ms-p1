import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { HandleRpcExceptions } from 'src/common/decorators';

import { PaymentResponseDto } from './dto/response';

import { PaymentsRepository } from './repository/payments.repository';

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
}
