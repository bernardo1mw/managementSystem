import Order from '../entities/Order';

export default interface OrderRepository {
  save(order: Order): Promise<void>;
  delete(order: Order): Promise<void>;
  findAllBy(
    input: Partial<{
      customerId: number;
    }>,
  ): Promise<Order[]>;
  findOneBy(
    input: Partial<{
      customerId: number;
      id: number;
    }>,
  ): Promise<Order>;
}
