import { DeleteResultResponse } from 'src/common/dto/response';
import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';
import { QueryRunner, FindOptionsWhere, Repository } from 'typeorm';
import { PaymentType } from '../entity/payment-type.entity';
import { IPaymentsTypesRepository } from './interfaces/payments-types.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';

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
    throw new Error('Method not implemented.');
  }
  findOne(id: string): Promise<PaymentType> {
    throw new Error('Method not implemented.');
  }
  create(request: Partial<PaymentType>): PaymentType {
    throw new Error('Method not implemented.');
  }
  save(request: CreatePaymentTypeRequest): Promise<PaymentType> {
    throw new Error('Method not implemented.');
  }
  update(
    conditions: FindOptionsWhere<PaymentType>,
    request: Partial<PaymentType>,
  ): Promise<PaymentType> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<DeleteResultResponse> {
    throw new Error('Method not implemented.');
  }
}
