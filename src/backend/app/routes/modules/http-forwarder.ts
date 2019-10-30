import {Headers} from 'node-fetch';
import fetch from 'node-fetch';

import {CredentialsModule} from './credentials';

export class HttpForwarderModule {

  constructor(private req) {

  }

  doCall(url: string, credentialUuid?: string): Promise<{resStatus: number, contentType: string, data: any}> {
    const requestHeaders: any = new Headers();

    console.log(url);

    if (!credentialUuid) return this.doRequest(url, requestHeaders);

    // Set credential headers
    const Credentials = new CredentialsModule();
    return Credentials.getCredential(this.req.session.uuid, credentialUuid).then((cred) => {

      if (cred.fields.Type === 'basic') {
        requestHeaders.append('Authorization', `Basic ${Buffer.from(cred.fields.UserName + ':' + cred.fields.Password.getText()).toString('base64')}`);
      }

      return this.doRequest(url, requestHeaders);
    }).catch(e => {
      throw e;
    });
  }

  doRequest(url: string, requestHeaders: Headers): Promise<{resStatus: number, contentType: string, data: any}> {
    let resStatus;
    let contentType;

    return fetch(url, {
      method: 'GET',
      headers: requestHeaders
    }).then(res => {
      resStatus = res.status;
      contentType = res.headers.get('content-type');
      return (res.headers.get('content-type').includes('json') ? res.json() : res.text());
    }).then(res => {

      // Return data
      return {
        resStatus,
        contentType,
        data: res
      };

    }).catch(e => {
      return e;
    });
  }

}
