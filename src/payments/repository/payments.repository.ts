/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOptionsWhere, QueryRunner } from 'typeorm';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto } from '../dto/request';

import { Payment } from '../entity/payment.entity';

import { IPaymentsRepository } from './interfaces/payments.repository.interface';

export class PaymentsRepository implements IPaymentsRepository {
  setQueryRunner(queryRunner: QueryRunner): void {
    throw new Error('Method not implemented.');
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
