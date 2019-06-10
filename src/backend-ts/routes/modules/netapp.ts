import {fetch} from 'node-fetch';
import xml2js from 'xml2js';

const parseString = xml2js.parseString;

export class NetAppModule {

  constructor() {

  }

  callApi(host, port, username, password, path, xml): Promise<any> {

    // TODO: port?

    return fetch(host + path, {
      method: 'POST',
      body: xml,
      headers: {
        'Content-Type': 'text/xml',
        Authorization: 'Basic ' + new Buffer(username + ':' + password).toString('base64'),
        'Content-Length': Buffer.byteLength(xml),
        Expect: '100-continue'
      }
    }).then(res => parseString(res));

  }

}
