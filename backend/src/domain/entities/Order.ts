import { OrderProductEntity } from 'src/infra/database/mapping/order-product.entity';
import Product from './Product';
import OrderProduct from './OrderProduct';

export default class Order {
  private id: number;
  private uuid: string;
  private customerId: number;
  private total: number;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;
  private items: OrderProduct[] = [];

  constructor(input: Partial<Order.Input>) {
    Object.assign(this, input);
  }

  addItem(product: Product, quantity: number) {
    if (quantity <= 0) throw new Error('Invalid quantity');
    if (
      this.items.some(
        (item: OrderProduct) =>
          item.getState().productId === product.getState().id,
      )
    )
      throw new Error('Duplicated item');
    this.items.push(
      new OrderProduct({
        productId: product.getState().id,
        unitPrice: product.getState().price,
        quantity: quantity,
      }),
    );
  }

  private getTotal() {
    let total = 0;
    for (const item of this.items) {
      total += item.getState().unitPrice * item.getState().quantity;
    }
    return total;
  }

  delete() {
    this.deletedAt = new Date();
    return this;
  }

  getState(): Order.Output {
    return {
      id: this.id,
      uuid: this.uuid,
      customerId: this.customerId,
      total: this.total || this.getTotal(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      items: this.items,
    };
  }
}

namespace Order {
  export type Input = {
    id: number;
    uuid: string;
    customerId: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    items: OrderProduct[];
  };

  export type Output = {
    id: number;
    uuid: string;
    customerId: number;
    total: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    items: OrderProduct[];
  };
}
