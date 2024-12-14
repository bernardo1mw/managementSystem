import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { OrderEntity } from './order.entity';
import { ProductEntity } from './product.entity';

@Entity('order_products')
export class OrderProductEntity {
  @PrimaryColumn({ name: 'order_id' })
  orderId: number;

  @PrimaryColumn({ name: 'product_id' })
  productId: number;

  @Column({ type: 'int', default: 1 })
  quantity: number;

  @Column({ name: 'unit_price', type: 'numeric', precision: 10, scale: 2 })
  unitPrice: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => OrderEntity, (order) => order.orderProducts)
  @JoinColumn([{ name: 'order_id', referencedColumnName: 'id' }])
  order: OrderEntity;

  @ManyToOne(() => ProductEntity, (product) => product.orderProducts)
  @JoinColumn([{ name: 'product_id', referencedColumnName: 'id' }])
  product: ProductEntity;
}
