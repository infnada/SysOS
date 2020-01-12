import fetch, {Headers, Response} from 'node-fetch';
import {parseStringPromise} from 'xml2js';

export class AnyOpsOSNetappModule {

  constructor() {
  }

  callApi(host: string, port: number, username: string, password: string, path: string, xml: string): Promise<any> {
    const proto: string = (port === 80 ? 'http' : 'https');


    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('Authorization', 'Basic ' + new Buffer(username + ':' + password).toString('base64'));
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Expect', '100-continue');

    return fetch(`${proto}://${host}:${port}${path}`, {
      method: 'POST',
      body: xml,
      headers: requestHeaders
    })
    .then((res: Response) => res.text())
    .then(async (res: any) => {

      return parseStringPromise(res);

    }).catch(e => e);

  }

}
