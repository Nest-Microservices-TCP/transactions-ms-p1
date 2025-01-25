import { Status } from 'src/common/enums';

export abstract class BaseResponseDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
  deletedAt: Date;
  status: Status;
}
