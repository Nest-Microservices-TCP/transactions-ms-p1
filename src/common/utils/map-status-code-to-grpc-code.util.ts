import { status as GrpcStatus } from '@grpc/grpc-js';

export function mapStatusCodeToGrpcCode(statusCode: number): GrpcStatus {
  switch (statusCode) {
    case 400:
      return GrpcStatus.INVALID_ARGUMENT;
    case 401:
      return GrpcStatus.UNAUTHENTICATED;
    case 403:
      return GrpcStatus.PERMISSION_DENIED;
    case 404:
      return GrpcStatus.NOT_FOUND;
    case 409:
      return GrpcStatus.ALREADY_EXISTS;
    case 429:
      return GrpcStatus.RESOURCE_EXHAUSTED;
    case 499:
      return GrpcStatus.CANCELLED;
    case 500:
      return GrpcStatus.INTERNAL;
    case 503:
      return GrpcStatus.UNAVAILABLE;
    default:
      return GrpcStatus.UNKNOWN;
  }
}
