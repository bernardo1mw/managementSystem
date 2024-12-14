import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderProductEntity } from './order-product.entity';

@Entity('products')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true })
  uuid: string;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ name: 'price', type: 'numeric', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock: number;

  @Column({ type: 'text', array: true, nullable: true })
  images: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => OrderProductEntity, (orderProduct) => orderProduct.product)
  orderProducts: OrderProductEntity[];
}
