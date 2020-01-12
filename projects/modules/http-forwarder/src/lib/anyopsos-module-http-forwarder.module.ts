import {Request} from 'express';
import fetch, {Headers, Response} from 'node-fetch';

import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {ForwarderResponse} from './types/forwarder-response';

export class AnyOpsOSHttpForwarderModule {

  constructor(private readonly request: Request) {
  }

  async doCall(url: string, credentialUuid?: string): Promise<ForwarderResponse> {
    const requestHeaders: any = new Headers();

    if (!credentialUuid) return this.doRequest(url, requestHeaders);

    // Set credential headers
    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(this.request.session.userUuid, this.request.session.sessionID, credentialUuid);

    // TODO all credential types
    if (credential.fields.Type === 'basic') {
      requestHeaders.append('Authorization', `Basic ${Buffer.from(credential.fields.UserName + ':' + credential.fields.Password.getText()).toString('base64')}`);
    }

    return this.doRequest(url, requestHeaders);
  }

  private doRequest(url: string, requestHeaders: Headers): Promise<ForwarderResponse> {
    let resStatus: number;
    let contentType: string | null;

    // TODO port?

    return fetch(url, {
      method: 'GET',
      headers: requestHeaders
    }).then((res: Response) => {
      resStatus = res.status;
      contentType = res.headers.get('content-type');

      return (res.headers.get('content-type').includes('json') ? res.json() : res.text());
    }).then((res: any) => {

      // Return data
      return {
        resStatus,
        contentType,
        data: res
      };

    }).catch(e => e);
  }

}
