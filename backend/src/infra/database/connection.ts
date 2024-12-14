export interface DatabaseConnection<T = any> {
  connect(): Promise<void>;
  getConnection(): T;
}

export namespace DatabaseConnection {}
