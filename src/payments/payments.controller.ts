import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

import { PaymentsService } from './payments.service';

import { PaymentResponseDto } from './dto/response';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('payments.find.all')
  async findAll(): Promise<PaymentResponseDto[]> {
    return this.paymentsService.findAll();
  }
}
