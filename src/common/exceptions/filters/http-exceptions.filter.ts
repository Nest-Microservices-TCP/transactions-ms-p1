import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import {
  CustomExceptionDetails,
  CustomHttpExceptionResponse,
} from 'src/grpc/common/common_exceptions.pb';
import { mapStatusCodeToGrpcCode } from 'src/common/utils';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionsFilter.name);

  catch(exception: HttpException) {
    const exceptionResponse: CustomHttpExceptionResponse =
      exception['response'] || {};

    const statusCode = exception['status'] ?? 500;

    const {
      class_name = 'Unknown service',
      method_name = 'Unknown method',
      message: exception_message = 'Unexpected error',
    } = exceptionResponse;

    const code = mapStatusCodeToGrpcCode(statusCode);

    const response: CustomExceptionDetails = {
      exception_message,
      metadata: {
        class_name,
        method_name,
        grpc_code: code,
      },
    };

    this.logger.error(
      `[${class_name}.${method_name}] HttpException: ${exception_message}`,
    );

    const message = JSON.stringify(response);

    /**
     * La razón de usar throwError es que este devuelve un observable que emite
     * un error, que es lo que espera internamente el protocolo de microservicios
     */
    return throwError(() => new RpcException({ message, code }));
  }
}
