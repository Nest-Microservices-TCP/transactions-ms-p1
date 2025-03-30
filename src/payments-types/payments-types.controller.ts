import { Controller } from '@nestjs/common';

import { PaymentsTypesServiceControllerMethods } from 'src/grpc/proto/transactions/payments_types.pb';

import { PaymentsTypesService } from './payments-types.service';

@Controller()
@PaymentsTypesServiceControllerMethods()
export class PaymentsTypesController {
  constructor(private readonly paymentsTypesService: PaymentsTypesService) {}
}
