import { RoomsStatesRepository } from '../../rooms-states/repository/rooms-states.repository';
import { IUnitForWork } from './interfaces/unit-of-work.interface';
import { DataSource, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UnitOfWork implements IUnitForWork {
  private queryRunner: QueryRunner;

  constructor(
    private readonly dataSource: DataSource,
    private readonly roomsStatesRepository: RoomsStatesRepository,
  ) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(work: () => Promise<void>): Promise<void> {
    try {
      await work();
      await this.queryRunner.commitTransaction();
    } catch (error) {
      await this.queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await this.queryRunner.release();
    }
  }

  getRoomsStatesRepository(): RoomsStatesRepository {
    return this.roomsStatesRepository;
  }
}
