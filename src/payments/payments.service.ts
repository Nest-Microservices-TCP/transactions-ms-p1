import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

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

  async findAll(): Promise<PaymentResponseDto[]> {
    const payments = await this.paymentsRepository.findAll();

    return this.plainToInstanceDto(payments);
  }
}
