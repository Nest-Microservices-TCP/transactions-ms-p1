import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentType as IPaymentType } from 'src/grpc/transactions/payments_types.pb';
import { BaseEntity } from 'src/common/entity';

@Entity({ name: 'payments_types' })
export class PaymentType extends BaseEntity implements IPaymentType {
  @PrimaryGeneratedColumn('uuid', {
    primaryKeyConstraintName: 'PK_PaymentsTypes',
  })
  payment_type_id: string;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  name: string;
}
