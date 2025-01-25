import { NotFoundException } from '@nestjs/common';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string) {
    super(`The ${entityName} with provided ID does not exist`);
  }
}
