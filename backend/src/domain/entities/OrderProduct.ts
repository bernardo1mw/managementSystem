export default class OrderProduct {
  private id: number;
  private orderId: number;
  private productId: number;
  private productName: string;
  private quantity: number;
  private unitPrice: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(input: Partial<OrderProduct.Input>) {
    Object.assign(this, input);
  }

  getState(): OrderProduct.Output {
    return {
      id: this.id,
      orderId: this.orderId,
      productName: this.productName,
      productId: this.productId,
      quantity: this.quantity,
      unitPrice: this.unitPrice,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}

namespace OrderProduct {
  export type Input = {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
  };

  export type Output = {
    id: number;
    orderId: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
  };
}
