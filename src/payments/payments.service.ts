import { Injectable } from '@nestjs/common';

import { PaymentsRepository } from './repository/payments.repository';

@Injectable()
export class PaymentsService {
  constructor(private readonly paymentsRepository: PaymentsRepository) {}
}
