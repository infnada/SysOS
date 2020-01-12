import {KubeConfig} from '@kubernetes/client-node';

import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';

import {ConnectionKubernetes} from './types/connection-kubernetes';
import {UserToSessionToConfigMap} from './types/user-to-session-to-config-map';

const kubernetesSessions: UserToSessionToConfigMap = {};

export class KubernetesSessionsModule {

  constructor() {
  }

  async createSession(userUuid: string, sessionUuid: string, data: ConnectionKubernetes): Promise<KubeConfig>  {

    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, data.credential);

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

    const kc = new KubeConfig();

    await kc.loadFromOptions({
      clusters: [cluster],
      users: [user],
      contexts: [context],
      currentContext: context.name,
    });

    if (!kubernetesSessions[userUuid]) kubernetesSessions[userUuid] = {};
    if (!kubernetesSessions[userUuid][sessionUuid]) kubernetesSessions[userUuid][sessionUuid] = {};
    kubernetesSessions[userUuid][sessionUuid][data.uuid] = kc;

    return kubernetesSessions[userUuid][sessionUuid][data.uuid];
  }

  closeSession(userUuid: string, sessionUuid: string, connectionUuid: string): void {
    // TODO close?
    // @ts-ignore
    return kubernetesSessions[userUuid][sessionUuid][connectionUuid].close();
  }

  getSession(userUuid: string, sessionUuid: string, connectionUuid: string): KubeConfig {
    return kubernetesSessions[userUuid][sessionUuid][connectionUuid];
  }

}
