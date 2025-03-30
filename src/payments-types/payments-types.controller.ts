import { Controller } from '@nestjs/common';

import {
  CreatePaymentTypeRequest,
  PaymentsTypesServiceController,
  PaymentsTypesServiceControllerMethods,
} from 'src/grpc/proto/transactions/payments_types.pb';

import { PaymentsTypesService } from './payments-types.service';

@Controller()
@PaymentsTypesServiceControllerMethods()
export class PaymentsTypesController implements PaymentsTypesServiceController {
  constructor(private readonly paymentsTypesService: PaymentsTypesService) {}

  save(request: CreatePaymentTypeRequest): void {
    this.paymentsTypesService.save(request);
  }
}
