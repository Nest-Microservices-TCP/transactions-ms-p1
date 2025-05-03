import { InternalServerErrorException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class FailedRestoreException extends InternalServerErrorException {
  constructor(entityName: string) {
    const { class_name, method_name } = getCallerInfo();

    const message = `Error to restore the ${entityName}, try again`;

    super({ class_name, method_name, message });
  }
}
