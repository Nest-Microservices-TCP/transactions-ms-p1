import { FindOptionsWhere } from 'typeorm';

export interface IExtendedRepository<T> {
  findByIds(ids: string[]): Promise<T[]>;
  findByCriteria(criteria: FindOptionsWhere<T>): Promise<T>;
  findWithRelations(relations: string[]): Promise<T[]>;
  count(criteria: FindOptionsWhere<T>): Promise<number>;
  paginate(page: number, limit: number): Promise<[T[], number]>;
  softDelete(id: string): Promise<T>;
  restore(id: string): Promise<T>;
  exists(criteria: FindOptionsWhere<T>): Promise<boolean>;
  bulkSave(entities: T[]): Promise<T[]>;
  bulkUpdate(entities: T[]): Promise<T[]>;
  customQuery(query: string, params: any[]): Promise<any>;
}
