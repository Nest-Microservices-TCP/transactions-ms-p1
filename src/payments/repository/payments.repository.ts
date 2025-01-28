/* eslint-disable @typescript-eslint/no-unused-vars */
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteResult,
  FindOptionsWhere,
  In,
  QueryRunner,
  Repository,
  UpdateResult,
} from 'typeorm';

import {
  EntityNotFoundException,
  FailedRemoveException,
  FailedRestoreException,
  FailedSoftDeleteException,
} from 'src/common/exceptions/custom';

import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentDto } from '../dto/request';

import { Payment } from '../entity/payment.entity';

import { IPaymentsRepository } from './interfaces/payments.repository.interface';
import { Status } from 'src/common/enums';

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

  async update(
    conditions: FindOptionsWhere<Payment>,
    request: Partial<Payment>,
  ): Promise<Payment> {
    const payment = await this.findByCriteria(conditions);

    Object.assign(payment, request);

    return this.paymentsRepository.save(payment);
  }

  async remove(paymentId: string): Promise<DeleteResultResponse> {
    await this.findOne(paymentId);

    const result: DeleteResult =
      await this.paymentsRepository.delete(paymentId);

    if (result?.affected === 0) {
      throw new FailedRemoveException('payment');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(paymentsIds: string[]): Promise<Payment[]> {
    return this.paymentsRepository.find({
      where: {
        paymentId: In(paymentsIds),
      },
    });
  }

  async findByCriteria(criteria: FindOptionsWhere<Payment>): Promise<Payment> {
    const payment = await this.paymentsRepository.findOne({ where: criteria });

    if (!payment) {
      throw new EntityNotFoundException('payment');
    }

    return payment;
  }

  findWithRelations(relations: string[]): Promise<Payment[]> {
    return this.paymentsRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<Payment>): Promise<number> {
    return this.paymentsRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[Payment[], number]> {
    return this.paymentsRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(paymentId: string): Promise<Payment> {
    await this.findOne(paymentId);

    const result: UpdateResult = await this.paymentsRepository.update(
      paymentId,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new FailedSoftDeleteException('payment');
    }

    return await this.findOne(paymentId);
  }

  async restore(paymentId: string): Promise<Payment> {
    await this.findOne(paymentId);

    const result: UpdateResult = await this.paymentsRepository.update(
      paymentId,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('payment');
    }

    return await this.findOne(paymentId);
  }

  exists(criteria: FindOptionsWhere<Payment>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  bulkSave(entities: Payment[]): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(entities: Payment[]): Promise<Payment[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
