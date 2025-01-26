import { IBaseRepository } from './base-repository.interface';
import { IExtendedRepository } from './extended-repository.interface';

export interface IRepository<T, CreateDto>
  extends IBaseRepository<T, CreateDto>,
    IExtendedRepository<T> {}
