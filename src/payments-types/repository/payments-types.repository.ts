import {
  Repository,
  QueryRunner,
  DeleteResult,
  FindOptionsWhere,
} from 'typeorm';
import {
  FailedRemoveException,
  EntityNotFoundException,
} from 'src/common/exceptions/custom';
import { InjectRepository } from '@nestjs/typeorm';

import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';
import { IPaymentsTypesRepository } from './interfaces/payments-types.repository.interface';

import { PaymentType } from '../entity/payment-type.entity';
import { DeleteResultResponse } from 'src/common/dto/response';

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
}
