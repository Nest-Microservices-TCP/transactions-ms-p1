import { IRepository } from 'src/common/repository';
import { CreatePaymentTypeRequest } from 'src/grpc/proto-files/transactions/payments_types.pb';
import { PaymentType } from 'src/payments-types/entity/payment-type.entity';

export interface IPaymentsTypesRepository
  extends IRepository<PaymentType, CreatePaymentTypeRequest> {}
