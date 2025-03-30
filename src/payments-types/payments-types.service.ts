import { Injectable } from '@nestjs/common';
import { PaymentsTypesRepository } from './repository/payments-types.repository';

@Injectable()
export class PaymentsTypesService {
  constructor(
    private readonly paymentsTypesRepository: PaymentsTypesRepository,
  ) {}
}
