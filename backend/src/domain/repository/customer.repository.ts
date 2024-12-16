import Customer from '../entities/Customer';

export default interface CustomerRepository {
  save(customer: Customer): Promise<void>;
  findAllBy(
    input: Partial<{
      id: number;
      uuid: string;
      userId: number;
      businessName: string;
      document: string;
      email: string;
    }>,
  ): Promise<Customer[]>;
  findOneBy(
    input: Partial<{
      id: number;
      uuid: string;
      userId: number;
      businessName: string;
      document: string;
      email: string;
    }>,
  ): Promise<Customer | null>;
}
