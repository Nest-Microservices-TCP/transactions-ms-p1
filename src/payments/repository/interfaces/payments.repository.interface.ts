import { IRepository } from 'src/common/repository';
import { CreatePaymentDto } from 'src/payments/dto/request/create-payment.dto';
import { Payment } from 'src/payments/entity/payment.entity';

export interface IPaymentsRepository
  extends IRepository<Payment, CreatePaymentDto> {}
