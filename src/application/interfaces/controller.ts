export interface IRequest {
  body: Record<string, unknown>;
  accountId: string | undefined;
}

export interface IResponse {
  statusCode: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body: Record<string, any> | null;
}

export interface IController {
  handle(request: IRequest): Promise<IResponse>;
}
