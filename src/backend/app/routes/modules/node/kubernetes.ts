import {get} from 'request';

import {KubernetesSessionsModule} from '../../../socket/modules/kubernetes/kubernetes-sessions';

export class KubernetesModule {

  private KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule();

  constructor() {

  }

  async getResource(uuid, resourceUrl): Promise<any> {
    const kc = this.KubernetesSessionsModule.getSession(uuid);
    const opts = {
      url: kc.getCurrentCluster().server + resourceUrl
    };

    kc.applyToRequest(opts);

    await get(kc.getCurrentCluster().server + resourceUrl, opts, (error, response, body) => {
      if (error) console.log(`error: ${error}`);
      if (response) console.log(`statusCode: ${response.statusCode}`);
      console.log(`body: ${body}`);

      return body;
    });
  }

}
