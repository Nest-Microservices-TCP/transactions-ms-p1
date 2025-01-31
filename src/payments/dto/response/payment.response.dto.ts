import { Expose } from 'class-transformer';

export class PaymentResponseDto {
  @Expose()
  paymentId: string;

  @Expose()
  total: number;

  @Expose()
  ticketId: string;
}
