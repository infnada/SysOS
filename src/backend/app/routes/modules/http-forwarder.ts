import {Headers} from 'node-fetch';
import fetch from 'node-fetch';

import {CredentialsModule} from './credentials';

export class HttpForwarderModule {

  constructor(private req) {

  }

  doCall(url: string, credentialUuid?: string): Promise<{resStatus: number, res: any}> {
    const requestHeaders: any = new Headers();

    if (!credentialUuid) return this.doRequest(url, requestHeaders);

    // Set credential headers
    const Credentials = new CredentialsModule();
    return Credentials.getCredential(this.req.session.uuid, credentialUuid).then((cred) => {
      const requestHeaders: any = new Headers();

      if (cred.type === 'basic') {
        requestHeaders.append('Authorization', `Basic ${Buffer.from(cred.fields.UserName + ":" + cred.fields.Password).toString('base64')}`);
      }

      return this.doRequest(url, requestHeaders);
    });
  }

  doRequest(url: string, requestHeaders: Headers) {
    let resStatus;

    console.log(url);

    return fetch(url, {
      method: 'GET',
      headers: requestHeaders
    }).then(res => {
      resStatus = res.status;
      return (res.headers.get('content-type').includes('json') ? res.json() : res.text())
    }).then(res => {

      // Return data
      return {
        resStatus,
        res
      }

    }).catch(e => {
      return e;
    });
  }

}
