import {Headers} from 'node-fetch';
import fetch from 'node-fetch';
import * as xml2js from 'xml2js';

const parseString = xml2js.parseString;

export class VMWareModule {

  constructor() {

  }

  getClientVersion(host, port): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    const requestHeaders: any = new Headers();
    requestHeaders.append('Accept', 'application/xml');
    requestHeaders.append('Content-Type', 'application/xml');

    return new Promise((resolve, reject) => {

      return fetch(`${proto}://${host}:${port}/client/clients.xml`, {
        method: 'GET',
        headers: requestHeaders
      }).then(res => res.text()
      ).then(body => {
        return parseString(body, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      }).catch(e => {
        return reject(e);
      });

    });

  }

  connect(host, port, username, password): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    const requestHeaders: any = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Authorization', `Basic ${new Buffer(username + ':' + password).toString('base64')}`);

    return fetch(`${proto}://${host}:${port}/rest/com/vmware/cis/session?~action=get`, {
      method: 'POST',
      headers: requestHeaders
    }).then(res => res).catch(e => {
      return e;
    });;

  }

  callApi(host, port, path, cookie): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    // https://code.vmware.com/apis/191/vsphere-automation

    const requestHeaders: any = new Headers();
    requestHeaders.append('Accept', 'application/json');
    requestHeaders.append('Content-Type', 'application/json');
    requestHeaders.append('Cookie', cookie);

    return fetch(`${proto}://${host}:${port}${path}`, {
      method: 'GET',
      headers: requestHeaders
    }).then(res => res).catch(e => {
      return e;
    });;

  }

  connectSoap(host, port, username, password) {
    const proto = (port === '80' ? 'http' : 'https');
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

    const requestHeaders: any = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', 'urn:vim25/6.0');
    requestHeaders.append('Content-Length', Buffer.byteLength(xml));
    requestHeaders.append('Expect', '100-continue');

    return fetch(`${proto}://${host}:${port}/sdk`, {
      method: 'POST',
      body: xml,
      headers: requestHeaders
    }).then(res => res).catch(e => {
      return e;
    });

  }

  callApiSoap(host, port, action, xml, cookie) {
    const proto = (port === '80' ? 'http' : 'https');

    const requestHeaders: any = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('SOAPAction', action);
    requestHeaders.append('Content-Length', Buffer.byteLength(xml));
    requestHeaders.append('Expect', '100-continue');
    requestHeaders.append('Cookie', cookie);

    return new Promise((resolve, reject) => {

      return fetch(`${proto}://${host}:${port}/sdk`, {
        method: 'POST',
        body: xml,
        headers: requestHeaders
      }).then(res => res.text()
      ).then(body => {
        return parseString(body, (err, result) => {
          if (err) return reject(err);
          return resolve(result);
        });
      }).catch(e => {
        return reject(e);
      });

    });

  }

}
