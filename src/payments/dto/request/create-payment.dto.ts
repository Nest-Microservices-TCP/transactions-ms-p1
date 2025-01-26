import { IsNumber, IsPositive, IsUUID, Min } from 'class-validator';

export class CreatePaymentDto {
  @IsNumber()
  @IsPositive()
  @Min(1)
  total: number;

  @IsUUID()
  ticketId: string;
}
