export default class Product {
  private id: number;
  private uuid: string;
  private userId: number;
  private description: string;
  private price: number;
  private stock: number;
  private images: string[];
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date | null;

  constructor(input: Partial<Product.Input>) {
    Object.assign(this, input);
  }

  update(input: Partial<Product.Update>) {
    this.updatedAt = new Date();
    Object.assign(this, input);
    return this;
  }

  delete() {
    this.deletedAt = new Date();
    return this;
  }

  getState(): Product.Output {
    return {
      id: this.id,
      uuid: this.uuid,
      userId: this.userId,
      description: this.description,
      price: this.price,
      stock: this.stock,
      images: this.images,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }
}

namespace Product {
  export type Input = {
    id: number;
    uuid: string;
    userId: number;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };

  export type Update = {
    description: string;
    price: number;
    stock: number;
    images: string[];
  };

  export type Output = {
    id: number;
    uuid: string;
    userId: number;
    description: string;
    price: number;
    stock: number;
    images: string[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}
