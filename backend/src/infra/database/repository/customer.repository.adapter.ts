import { DataSource } from 'typeorm';
import Customer from 'src/domain/entities/Customer';
import CustomerRepository from 'src/domain/repository/customer.repository';
import { CustomerEntity } from '../mapping/customer.entity';
import Email from 'src/domain/entities/Email';
import Order from 'src/domain/entities/Order';

export class CustomerRepositoryTypeORMAdapter implements CustomerRepository {
  constructor(private readonly connection: DataSource) {}

  async save(customer: Customer): Promise<void> {
    const repository = this.connection.getRepository(CustomerEntity);
    const customerEntity = repository.create({
      id: customer.getState().id,
      uuid: customer.getState().uuid,
      userId: customer.getState().userId,
      businessName: customer.getState().businessName,
      document: customer.getState().document,
      email: customer.getState().email,
      createdAt: customer.getState().createdAt,
      updatedAt: customer.getState().updatedAt,
      deletedAt: customer.getState().deletedAt,
    });
    await repository.save(customerEntity, { reload: false });
  }

  async findAllBy(
    input: Partial<{
      id: number;
      uuid: string;
      userId: number;
      businessName: string;
      document: string;
      email: string;
    }>,
  ): Promise<Customer[]> {
    const repository = this.connection.getRepository(CustomerEntity);
    const query = repository
      .createQueryBuilder('customers')
      .leftJoinAndSelect('customers.orders', 'orders');
    for (const key in input) {
      const i = Object.keys(input).indexOf(key);
      if (Object.prototype.hasOwnProperty.call(input, key)) {
        const value = input[key];
        query
          .andWhere(`customers.${key} = :value_${i}`)
          .setParameter(`value_${i}`, value);
      }
    }
    const customers = await query.getMany();
    return customers.map((customer) => {
      return new Customer({
        id: customer.id,
        uuid: customer.uuid,
        userId: customer.userId,
        businessName: customer.businessName,
        document: customer.document,
        email: new Email(customer.email),
        createdAt: customer.createdAt,
        updatedAt: customer.updatedAt,
        deletedAt: customer.deletedAt,
        orders: customer.orders.map((order) => {
          return new Order({
            id: order.id,
            uuid: order.uuid,
            total: order.total,
            customerId: order.customerId,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            deletedAt: order.deletedAt,
          });
        }),
      });
    });
  }

  // async findBy(
  //   input: Partial<{
  //     id: number;
  //     uuid: string;
  //     providerId: string;
  //     provider: number;
  //     email: string;
  //     document: string;
  //   }>,
  // ): Promise<Customer> {
  //   const repository = this.connection.getRepository(CustomerEntity);
  //   const Customer = await repository.findOne({
  //     where: input,
  //   });
  //   return Customer.buildExistingCustomer({
  //     id: Customer.id,
  //     email: Customer.email,
  //     hash: Customer.password,
  //     salt: Customer.salt,
  //   });
  // }

  // async countByEmail(email: string): Promise<number> {
  //   const repository = this.connection.getRepository(CustomerEntity);
  //   return repository
  //     .createQueryBuilder('Customers')
  //     .where(`Customers.email = :email`, { email })
  //     .getCount();
  // }

  // async save(Customer: Customer): Promise<void> {
  //   const repository = this.connection.getRepository(CustomerEntity);
  //   const CustomerEntity = repository.create({
  //     id: Customer.getState().id,
  //     uuid: Customer.getState().uuid,
  //     email: Customer.getState().email,
  //     password: Customer.getState().password,
  //     salt: Customer.getState().salt,
  //   });
  //   await repository.save(CustomerEntity, { reload: false });
  // }
}
