import { throwError } from 'rxjs';
import { status } from '@grpc/grpc-js';
import { QueryFailedError } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { CustomExceptionDetails } from 'src/grpc/common/common_exceptions.pb';

@Catch(QueryFailedError)
export class TypeORMExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(TypeORMExceptionsFilter.name);

  catch(exception: QueryFailedError) {
    const exception_message = exception?.message || 'Unexpected error';

    const response: CustomExceptionDetails = {
      exception_message,
    };

    const code = status.INTERNAL;
    const message = JSON.stringify(response);

    this.logger.error(`TypeORMException: ${exception_message}`);

    return throwError(() => new RpcException({ message, code }));
  }
}
