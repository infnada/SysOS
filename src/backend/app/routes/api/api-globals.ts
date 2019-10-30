export class ApiGlobalsModule {

  constructor(private req,
              private res) {

  }

  /**
   * Response No Valid
   */
  responseNoValid(input: string, text?: string): void {
    this.res.json(
      {
        status: 'error',
        data: {
          input,
          text
        }
      }
    );
  }

  serverError(err: any): void {
    console.log(err);

    this.res.status(200);
    this.res.json(
      {
        status: 'error',
        data: (err ? err : 'server_error')
      }
    );
  }

  validResponse(): void {
    this.res.json(
      {
        status: 'ok'
      }
    );
  }

  responseAsIs(status: number, contentType: string, data: any): void {
    this.res.set('Content-Type', contentType);
    this.res.status(status).send(data);
  }

  responseData(uuid: string, type: string, data: string): void {
    this.res.json(
      {
        status: 'ok',
        data: {
          uuid,
          type,
          data
        }
      }
    );
  }

  responseJsonData(data: any): string {
    return this.res.json(
      {
        status: 'ok',
        data
      }
    );
  }

  /**
   * Invalid Cookies
   *
   * @description
   * ioEmits a message to the client if detects an invalid cookie value or if the cookie value
   * is not the same that session value
   */
  invalidCookies(req) {
    return req.io.sockets
      .in(req.session.sessionID)
      .emit('message', '["invalid-cookies"]');
  }

}
