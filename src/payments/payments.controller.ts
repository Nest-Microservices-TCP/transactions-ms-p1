import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentResponseDto } from './dto/response';

import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('transactions.find.all.payments')
  async findAll(): Promise<PaymentResponseDto[]> {
    return this.paymentsService.findAll();
  }
}
