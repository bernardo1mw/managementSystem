import { DataSource } from 'typeorm';
import Order from 'src/domain/entities/Order';
import OrderRepository from 'src/domain/repository/order.repository';
import { OrderEntity } from '../mapping/order.entity';
import OrderProduct from 'src/domain/entities/OrderProduct';
import { OrderProductEntity } from '../mapping/order-product.entity';

export class OrderRepositoryTypeORMAdapter implements OrderRepository {
  constructor(private readonly connection: DataSource) {}

  async findAllBy(input: Partial<{ customerId: number }>): Promise<Order[]> {
    const repository = this.connection.getRepository(OrderEntity);
    const query = repository.createQueryBuilder('orders');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`orders.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const orders = await query.getMany();
    return orders.map((order) => {
      return new Order({
        id: order.id,
        uuid: order.uuid,
        total: order.total,
        customerId: order.customerId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
        deletedAt: order.deletedAt,
      });
    });
  }

  async findOneBy(
    input: Partial<{ customerId: number; orderId: number }>,
  ): Promise<Order> {
    const repository = this.connection.getRepository(OrderEntity);
    const query = repository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.orderProducts', 'orderProducts')
      .leftJoinAndSelect('orderProducts.product', 'product');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`orders.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const order = await query.getOne();

    return new Order({
      id: order.id,
      uuid: order.uuid,
      customerId: order.customerId,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
      deletedAt: order.deletedAt,
      items: order.orderProducts.map((orderProduct) => {
        return new OrderProduct({
          orderId: order.id,
          productId: orderProduct.productId,
          quantity: orderProduct.quantity,
          unitPrice: orderProduct.unitPrice,
          productName: orderProduct.product.description,
        });
      }),
    });
  }

  async save(order: Order): Promise<void> {
    await this.connection.transaction(async (manager) => {
      const orderRepository = manager.getRepository(OrderEntity);
      const orderProductsRepository = manager.getRepository(OrderProductEntity);

      const orderEntity = orderRepository.create({
        id: order.getState().id,
        uuid: order.getState().uuid,
        total: order.getState().total,
        customerId: order.getState().customerId,
        createdAt: order.getState().createdAt,
        updatedAt: order.getState().updatedAt,
        deletedAt: order.getState().deletedAt,
      });
      await orderRepository.save(orderEntity);

      await orderProductsRepository
        .createQueryBuilder()
        .insert()
        .values(
          order.getState().items.map((item) => {
            return {
              orderId: orderEntity.id,
              productId: item.getState().productId,
              quantity: item.getState().quantity,
              unitPrice: item.getState().unitPrice,
              createdAt: item.getState().createdAt,
              updatedAt: item.getState().updatedAt,
            };
          }),
        )
        .execute();
    });
  }

  async delete(order: Order): Promise<void> {
    const repository = this.connection.getRepository(OrderEntity);
    const orderEntity = repository.create({
      id: order.getState().id,
      uuid: order.getState().uuid,
      createdAt: order.getState().createdAt,
      updatedAt: order.getState().updatedAt,
      deletedAt: order.getState().deletedAt,
    });
    await repository.save(orderEntity, { reload: false });
  }
}
