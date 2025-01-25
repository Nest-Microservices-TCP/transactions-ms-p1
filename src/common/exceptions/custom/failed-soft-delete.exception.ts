import { InternalServerErrorException } from '@nestjs/common';

export class FailedSoftDeleteException extends InternalServerErrorException {
  constructor(entityName: string) {
    super(`Error to soft delete the ${entityName}, try again`);
  }
}
