import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';

export class UpdatePaymentDto {
  @IsUUID('4')
  paymentId: string;

  @IsNumber()
  @IsPositive()
  @Min(1)
  @IsOptional()
  total?: number;

  @IsUUID('4')
  @IsOptional()
  ticketId?: string;
}
