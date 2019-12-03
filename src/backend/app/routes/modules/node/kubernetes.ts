import {KubeConfig} from '@kubernetes/client-node';
import {get} from 'request';
import * as express from 'express';

import {Io} from '../../../app';
import {KubernetesSessionsModule} from '../../../socket/modules/kubernetes/kubernetes-sessions';

export class KubernetesModule {

  private socketId = this.req.session.socketId;
  private socket = Io.clients().sockets[this.socketId];
  private KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule(this.socket);

  constructor(private req: express.Request) {
  }

  getResource(connectionUuid: string, resourceUrl: string): Promise<any> {

    return this.KubernetesSessionsModule.getSession(connectionUuid).then((kc: KubeConfig) => {
      const opts = {
        url: kc.getCurrentCluster().server + resourceUrl
      };

      kc.applyToRequest(opts);

      return new Promise((resolve, reject) => {
        get(kc.getCurrentCluster().server + resourceUrl, opts, (error, response, body) => {
          if (error) return reject(error);

          return resolve(body);
        });
      });
    });
  }

}
