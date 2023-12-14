export interface IRequest {
  headers: Record<string, string>;
}

export interface IResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | null;
}

export interface IData {
  data: Record<string, unknown>;
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>;
}
