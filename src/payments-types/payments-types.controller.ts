import { Observable } from 'rxjs';
import { Controller } from '@nestjs/common';

import {
  PaymentType,
  CreatePaymentTypeRequest,
  FindOnePaymentTypeRequest,
  FindPaymentsTypesResponse,
  PaymentsTypesServiceController,
  PaymentsTypesServiceControllerMethods,
} from 'src/grpc/proto-files/transactions/payments_types.pb';

import { PaymentsTypesService } from './payments-types.service';

@Controller()
@PaymentsTypesServiceControllerMethods()
export class PaymentsTypesController implements PaymentsTypesServiceController {
  constructor(private readonly paymentsTypesService: PaymentsTypesService) {}

  save(request: CreatePaymentTypeRequest): void {
    this.paymentsTypesService.save(request);
  }

  findOne(
    request: FindOnePaymentTypeRequest,
  ): Promise<PaymentType> | Observable<PaymentType> | PaymentType {
    return this.paymentsTypesService.findOne(request);
  }

  find():
    | Promise<FindPaymentsTypesResponse>
    | Observable<FindPaymentsTypesResponse>
    | FindPaymentsTypesResponse {
    return this.paymentsTypesService.find();
  }
}
