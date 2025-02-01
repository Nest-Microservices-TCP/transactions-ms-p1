import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto, UpdatePaymentDto } from './dto/request';
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

  @MessagePattern({ cmd: 'find.payments.by.ids' })
  async findByIds(
    @Payload() paymentsIds: string[],
  ): Promise<PaymentResponseDto[]> {
    return this.paymentsService.findByIds(paymentsIds);
  }

  @MessagePattern({ cmd: 'save.payment' })
  async save(
    @Payload() request: CreatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.save(request);
  }

  @MessagePattern({ cmd: 'update.payment' })
  async update(
    @Payload() request: UpdatePaymentDto,
  ): Promise<PaymentResponseDto> {
    return this.paymentsService.update(request);
  }

  @MessagePattern({ cmd: 'remove.payment' })
  async remove(
    @Payload('paymentId') paymentId: string,
  ): Promise<DeleteResultResponse> {
    return this.paymentsService.remove(paymentId);
  }
}
