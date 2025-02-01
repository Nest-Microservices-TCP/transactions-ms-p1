import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PaymentResponseDto } from './dto/response';

import { PaymentsService } from './payments.service';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern({ cmd: 'find.all.payments' })
  async findAll(): Promise<PaymentResponseDto[]> {
    return this.paymentsService.findAll();
  }

  @MessagePattern({ cmd: 'find.one.payment' })
  async findOne(
    @Payload('paymentId') paymentId: string,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.findOne(paymentId);
  }
}
