import { InternalServerErrorException } from '@nestjs/common';

export class FailedRemoveException extends InternalServerErrorException {
  constructor(entityName: string) {
    super(`Error to remoce the ${entityName}, try again`);
  }
}
