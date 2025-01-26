/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto } from '../dto/request';

import { Payment } from '../entity/payment.entity';

import { IPaymentsRepository } from './interfaces/payments.repository.interface';
import { EntityNotFoundException } from 'src/common/exceptions/custom';

export class PaymentsRepository implements IPaymentsRepository {
  private paymentsRepository: Repository<Payment>;

  constructor(
    @InjectRepository(Payment)
    private readonly defaultRepository: Repository<Payment>,
  ) {}

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.paymentsRepository = queryRunner.manager.getRepository(Payment);
    } else {
      this.paymentsRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<Payment[]> {
    return this.paymentsRepository.find();
  }

  async findOne(paymentId: string): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({
      where: { paymentId },
    });

    if (!payment) {
      throw new EntityNotFoundException('payment');
    }

    return payment;
  }

  create(request: Partial<Payment>): Payment {
    return this.paymentsRepository.create(request);
  }

  save(request: CreatePaymentDto): Promise<Payment> {
    return this.paymentsRepository.save(request);
  }

  update(
    conditions: FindOptionsWhere<Payment>,
    request: Partial<Payment>,
  ): Promise<Payment> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
}
