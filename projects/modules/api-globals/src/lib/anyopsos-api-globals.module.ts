import {Request, Response} from 'express';

import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

export class AnyOpsOSApiGlobalsModule {

  constructor(private request: Request, private response: Response) {
  }

  public responseAsIs(status: number, contentType: string, data: unknown): void {
    this.response.set('Content-Type', contentType);
    this.response.status(status).send(data);
  }

  public validResponse(): Response {
    return this.response.json(
      {
        status: 'ok'
      } as BackendResponse
    );
  }

  public jsonDataResponse(data: unknown): Response {
    return this.response.json(
      {
        status: 'ok',
        data
      } as BackendResponse
    );
  }

  public invalidResponse(error: unknown): Response {
    return this.response.json(
      {
        status: 'error',
        data: error
      } as BackendResponse
    );
  }

  public notFound(): Response {
      this.response.status(404);
      return this.response.json(
        {
          status: 'error',
          data: 'resource_not_found'
        } as BackendResponse
      );
  }

  public serverError(e: any): Response {
    console.log(e);

    this.response.status(e.httpCode ? e.httpCode : 500);
    return this.response.json(
      {
        status: 'error',
        data: e && e.message ? e.message : e ? e : 'server_error'
      } as BackendResponse
    );

  }

}
