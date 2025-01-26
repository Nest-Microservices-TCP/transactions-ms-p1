/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, QueryRunner, Repository } from 'typeorm';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto } from '../dto/request';

import { Payment } from '../entity/payment.entity';

import { IPaymentsRepository } from './interfaces/payments.repository.interface';

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
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<Payment> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<Payment>): Payment {
    throw new Error('Method not implemented.');
  }
  save(request: CreatePaymentDto): Promise<Payment> {
    throw new Error('Method not implemented.');
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
