import {KubeConfig} from '@kubernetes/client-node';
import * as k8s from '@kubernetes/client-node';

import {CredentialsModule} from '../../../routes/modules/credentials';
import {ConnectionKubernetes} from '../../../interfaces/socket-connections/connection-kubernetes';

const kubernetesSessions: KubeConfig[] = [];

export class KubernetesSessionsModule {

  private CredentialsModule: CredentialsModule = new CredentialsModule();

  constructor(private socket?: any) {

  }

  async createSession(data: ConnectionKubernetes): Promise<KubeConfig>  {

    const credential = await this.CredentialsModule.getCredential(this.socket.request.session.uuid, data.credential);

    const cluster = {
      name: data.clusterName,
      server: data.clusterServer,
      caData: data.clusterCa
    };

    const user = {
      token: credential.fields.Password.getText(),
    };

    const context = {
      name: cluster.name,
      cluster: cluster.name,
    };

    const kc = new k8s.KubeConfig();

    await kc.loadFromOptions({
      clusters: [cluster],
      users: [user],
      contexts: [context],
      currentContext: context.name,
    });

    kubernetesSessions[data.uuid] = kc;

    return kubernetesSessions[data.uuid];
  }

  closeSession(uuid: string): void {
    return kubernetesSessions[uuid].close();
  }

  async getAllSessions(): Promise<any> {
    return kubernetesSessions;
  }

  getSession(uuid: string): KubeConfig {
    return kubernetesSessions[uuid];
  }

}
