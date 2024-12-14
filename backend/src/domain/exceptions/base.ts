export abstract class AppException extends Error {
  constructor(
    readonly customMessage: AppException.CustomMessage,
    readonly statusCode: number = 500,
    readonly statusText: string = 'InternalServerErrorException',
    readonly details?: string | string[],
  ) {
    super();
  }
}

export namespace AppException {
  export type CustomMessage =
    | string
    | string[]
    | { field: string; messages: string[] }[];
  export type InputDTO = {
    statusCode?: number;
    statusText?: string;
    customMessage?: string;
  };
}
