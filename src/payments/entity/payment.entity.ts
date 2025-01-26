import { BaseEntity } from 'src/common/entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'payments' })
export class Payment extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', {
    name: 'payment_id',
    primaryKeyConstraintName: 'PK_payments',
  })
  paymentId: string;

  @Column({
    name: 'total',
    type: 'numeric',
    precision: 9,
    scale: 2,
    nullable: false,
  })
  total: number;

  //TODO: Definir la relación 1:1 con tickets
  ticketId: string;
}
