import { NotFoundException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class EntityNotFoundException extends NotFoundException {
  constructor(entityName: string) {
    const { class_name, method_name } = getCallerInfo();

    const message = `The ${entityName} with provided ID does not exist`;

    super({ class_name, method_name, message });
  }
}
