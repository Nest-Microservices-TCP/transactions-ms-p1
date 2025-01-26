import { FindOptionsWhere, QueryRunner } from 'typeorm';
import { DeleteResultResponse } from '../dto/response';

export interface IBaseRepository<T, CreateDto> {
  setQueryRunner(queryRunner: QueryRunner): void;

  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  create(request: Partial<T>): T;
  save(request: CreateDto): Promise<T>;
  update(conditions: FindOptionsWhere<T>, request: Partial<T>): Promise<T>;
  remove(id: string): Promise<DeleteResultResponse>;
}
