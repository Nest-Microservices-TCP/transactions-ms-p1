import { InternalServerErrorException } from '@nestjs/common';

export class FailedRestoreException extends InternalServerErrorException {
  constructor(entityName: string) {
    super(`Error to restore the ${entityName}, try again`);
  }
}
