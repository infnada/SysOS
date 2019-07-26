import {Headers} from 'node-fetch';
import fetch from 'node-fetch';
import * as xml2js from 'xml2js';

const parseString = xml2js.parseString;

export class NetAppModule {

  constructor() {

  }

  callApi(host, port, username, password, path, xml): Promise<any> {
    const proto = (port === '80' ? 'http' : 'https');

    // TODO: port?

    const requestHeaders: any = new Headers();
    requestHeaders.append('Content-Type', 'text/xml');
    requestHeaders.append('Authorization', 'Basic ' + new Buffer(username + ':' + password).toString('base64'));
    requestHeaders.append('Content-Length', Buffer.byteLength(xml));
    requestHeaders.append('Expect', '100-continue');

    return new Promise((resolve, reject) => {

      fetch(`${proto}://${host}:${port}${path}`, {
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
