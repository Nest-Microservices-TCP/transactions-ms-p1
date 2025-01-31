import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PaymentResponseDto } from './dto/response/payment.response.dto';

import { PaymentsRepository } from './repository/payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}

  plainToInstanceDto(data: unknown) {
    return plainToInstance(PaymentResponseDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
