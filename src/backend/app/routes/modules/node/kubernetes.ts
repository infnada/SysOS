import {get} from 'request';

import {KubernetesSessionsModule} from '../../../socket/modules/kubernetes/kubernetes-sessions';

export class KubernetesModule {

  private KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule();

  constructor() {

  }

  getResource(uuid, resourceUrl): Promise<any> {
    const kc = this.KubernetesSessionsModule.getSession(uuid);
    const opts = {
      url: kc.getCurrentCluster().server + resourceUrl
    };

    kc.applyToRequest(opts);

    return new Promise((resolve, reject) => {
      get(kc.getCurrentCluster().server + resourceUrl, opts, async (error, response, body) => {
        if (error) return reject(error);

        return resolve(body);
      });
    });
  }

}
