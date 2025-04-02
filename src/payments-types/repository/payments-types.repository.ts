import {
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
  In,
  UpdateResult,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
  FailedRestoreException,
} from 'src/common/exceptions/custom';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';
import { IPaymentsTypesRepository } from './interfaces/payments-types.repository.interface';

import { PaymentType } from '../entity/payment-type.entity';
import { DeleteResultResponse } from 'src/common/dto/response';
import { Status } from 'src/common/enums';

export class PaymentsTypesRepository implements IPaymentsTypesRepository {
  private paymentsTypesRepository: Repository<PaymentType>;

  constructor(
    @InjectRepository(PaymentType)
    private readonly defaultRepository: Repository<PaymentType>,
  ) {
    this.paymentsTypesRepository = defaultRepository;
  }

  setQueryRunner(queryRunner: QueryRunner): void {
    if (queryRunner) {
      this.paymentsTypesRepository =
        queryRunner.manager.getRepository(PaymentType);
    } else {
      this.paymentsTypesRepository = this.defaultRepository;
    }
  }

  findAll(): Promise<PaymentType[]> {
    return this.paymentsTypesRepository.find();
  }

  async findOne(payment_type_id: string): Promise<PaymentType> {
    const paymentType = await this.paymentsTypesRepository.findOneBy({
      payment_type_id,
    });

    if (!paymentType) {
      throw new EntityNotFoundException('payment-types');
    }

    return paymentType;
  }

  create(request: Partial<PaymentType>): PaymentType {
    return this.paymentsTypesRepository.create(request);
  }

  save(request: CreatePaymentTypeRequest): Promise<PaymentType> {
    return this.paymentsTypesRepository.save(request);
  }

  async update(
    conditions: FindOptionsWhere<PaymentType>,
    request: Partial<PaymentType>,
  ): Promise<PaymentType> {
    const paymentType = await this.paymentsTypesRepository.findOne({
      where: conditions,
    });

    if (!paymentType) {
      throw new EntityNotFoundException('payment-type');
    }

    Object.assign(paymentType, request);

    return this.paymentsTypesRepository.save(paymentType);
  }

  async remove(payment_type_id: string): Promise<DeleteResultResponse> {
    await this.findOne(payment_type_id);

    const result: DeleteResult =
      await this.paymentsTypesRepository.delete(payment_type_id);

    if (result.affected === 0) {
      throw new FailedRemoveException('payment-type');
    }

    return { deleted: true, affected: result.affected };
  }

  findByIds(payments_types_ids: string[]): Promise<PaymentType[]> {
    return this.paymentsTypesRepository.find({
      where: {
        payment_type_id: In(payments_types_ids),
      },
    });
  }

  findByCriteria(
    criteria: FindOptionsWhere<PaymentType>,
  ): Promise<PaymentType> {
    return this.paymentsTypesRepository.findOne({ where: criteria });
  }

  findWithRelations(relations: string[]): Promise<PaymentType[]> {
    return this.paymentsTypesRepository.find({ relations });
  }

  count(criteria: FindOptionsWhere<PaymentType>): Promise<number> {
    return this.paymentsTypesRepository.count({ where: criteria });
  }

  paginate(page: number, limit: number): Promise<[PaymentType[], number]> {
    return this.paymentsTypesRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async softDelete(payment_type_id: string): Promise<PaymentType> {
    await this.findOne(payment_type_id);

    const result: UpdateResult = await this.paymentsTypesRepository.update(
      payment_type_id,
      {
        status: Status.DELETED,
        deletedAt: new Date(),
      },
    );

    if (result?.affected === 0) {
      throw new EntityNotFoundException('payment-type');
    }

    return this.findOne(payment_type_id);
  }

  async restore(payment_type_id: string): Promise<PaymentType> {
    await this.findOne(payment_type_id);

    const result: UpdateResult = await this.paymentsTypesRepository.update(
      payment_type_id,
      {
        status: Status.ACTIVE,
        deletedAt: null,
      },
    );

    if (result?.affected === 0) {
      throw new FailedRestoreException('payment-type');
    }

    return this.findOne(payment_type_id);
  }

  async exists(criteria: FindOptionsWhere<PaymentType>): Promise<boolean> {
    const count = await this.paymentsTypesRepository.count({ where: criteria });

    return count > 0;
  }

  bulkSave(payments_types: PaymentType[]): Promise<PaymentType[]> {
    return this.paymentsTypesRepository.save(payments_types);
  }

  bulkUpdate(entities: PaymentType[]): Promise<PaymentType[]> {
    throw new Error('Method not implemented.');
  }
  customQuery(query: string, params: any[]): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
