import { InternalServerErrorException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class FailedRemoveException extends InternalServerErrorException {
  constructor(entityName: string) {
    const { class_name, method_name } = getCallerInfo();

    const message = `Error to remove the ${entityName}, try again`;

    super({ class_name, method_name, message });
  }
}
