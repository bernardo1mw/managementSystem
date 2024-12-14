import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { CustomerEntity } from './customer.entity';
import { OrderProductEntity } from './order-product.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ name: 'customer_id' })
  customerId: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  total: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => CustomerEntity, (customer) => customer.orders)
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer: CustomerEntity;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.order)
  orderProducts: OrderProductEntity[];
}
