import { InternalServerErrorException } from '@nestjs/common';
import { getCallerInfo } from 'src/common/utils';

export class FailedSoftDeleteException extends InternalServerErrorException {
  constructor(entityName: string) {
    const { class_name, method_name } = getCallerInfo();

    const message = `Error to soft delete the ${entityName}, try again`;

    super({ class_name, method_name, message });
  }
}
