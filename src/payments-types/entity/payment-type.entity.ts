import { PaymentType as IPaymentType } from 'src/grpc/proto/transactions/payments_types.pb';

export class PaymentType implements IPaymentType {
  payment_type_id: string;
  name: string;
}
