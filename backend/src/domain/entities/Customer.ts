import Email from './Email';
import Order from './Order';
import Password from './Password';

export default class Customer {
  private id: number;
  private uuid: string;
  private userId: number;
  private businessName: string;
  private document: string;
  private email: Email;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;
  private orders: Order[];

  constructor(input: Partial<Customer.Input>) {
    Object.assign(this, input);
  }

  getState(): Customer.Output {
    return {
      id: this.id,
      uuid: this.uuid,
      userId: this.userId,
      businessName: this.businessName,
      document: this.document,
      email: this.email.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
      orders: this.orders,
    };
  }
}

namespace Customer {
  export type Input = {
    id: number;
    uuid: string;
    userId: number;
    businessName: string;
    document: string;
    email: Email;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    orders: Order[];
  };

  export type Output = {
    id: number;
    uuid: string;
    userId: number;
    businessName: string;
    document: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    orders: Order[];
  };
}
