import { IBaseRepository } from 'src/common/repository';
import { CreatePaymentTypeRequest } from 'src/grpc/proto/transactions/payments_types.pb';
import { PaymentType } from 'src/payments-types/entity/payment-type.entity';

export interface IPaymentsTypesRepository
  extends IBaseRepository<PaymentType, CreatePaymentTypeRequest> {}
