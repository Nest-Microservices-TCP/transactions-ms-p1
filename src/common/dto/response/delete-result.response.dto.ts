import { Expose } from 'class-transformer';

export class DeleteResultResponse {
  @Expose()
  deleted: boolean;

  @Expose()
  affected: number;
}
