import fetch, {Headers, Response} from 'node-fetch';
import {parseStringPromise} from 'xml2js';

export class AnyOpsOSVmwareModule {

  constructor() {
  }

  getClientVersion(host: string, port: number): Promise<any> {
    const proto: string = (port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/xml');
    requestHeaders.append('Content-Type', 'application/xml');

    return fetch(`${proto}://${host}:${port}/client/clients.xml`, {
      method: 'GET',
      headers: requestHeaders
    })
    .then((res: Response) => res.text())
    .then(async (res: any) => {

      return parseStringPromise(res);

    }).catch(e => e);

  }

  connect(host: string, port: number, username: string, password: string): Promise<Response> {
    const proto: string = (port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Basic ${new Buffer(username + ':' + password).toString('base64')}`);

    return fetch(`${proto}://${host}:${port}/rest/com/vmware/cis/session?~action=get`, {
      method: 'POST',
      headers: requestHeaders
    })
    .then((res: Response) => res)
    .catch(e => e);

  }

  callApi(host: string, port: number, path: string, cookie: string): Promise<Response> {
    const proto: string = (port === 80 ? 'http' : 'https');

    // https://code.vmware.com/apis/191/vsphere-automation

    const requestHeaders: any = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Cookie', cookie);

    return fetch(`${proto}://${host}:${port}${path}`, {
      method: 'GET',
      headers: requestHeaders
    })
    .then((res: Response) => res)
    .catch(e => e);

  }

  connectSoap(host: string, port: number, username: string, password: string): Promise<Response> {
    const proto: string = (port === 80 ? 'http' : 'https');
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Login xmlns="urn:vim25">
      <_this type="SessionManager">SessionManager</_this>
      <userName>${username}</userName>
      <password>${password}</password>
    </Login>
  </soap:Body>
</soap:Envelope>`;

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', 'urn:vim25/6.0');
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Expect', '100-continue');

    return fetch(`${proto}://${host}:${port}/sdk`, {
      method: 'POST',
      body: xml,
      headers: requestHeaders
    })
    .then((res: Response) => res)
    .catch(e => e);

  }

  callApiSoap(host: string, port: number, action: string, xml: string, cookie: string): Promise<any> {
    const proto: string = (port === 80 ? 'http' : 'https');

    const requestHeaders: Headers = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', action);
    requestHeaders.append('Content-Length', Buffer.byteLength(xml).toString());
    requestHeaders.append('Expect', '100-continue');
    requestHeaders.append('Cookie', cookie);

    return fetch(`${proto}://${host}:${port}/sdk`, {
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
