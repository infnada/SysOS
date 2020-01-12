import Dockerode from 'dockerode';

import {AnyOpsOSCredentialModule, KdbxCredential} from '@anyopsos/module-credential';
import {ConnectionDocker} from './types/connection-docker';
import {UserToSessionToDockerMap} from './types/user-to-session-to-docker-map';

const dockerSessions: UserToSessionToDockerMap = {};

export class DockerSessionsModule {

  constructor() {

  }

  async createSession(userUuid: string, sessionUuid: string, data: ConnectionDocker): Promise<Dockerode>  {

    const credential: KdbxCredential = await new AnyOpsOSCredentialModule().getCredential(userUuid, sessionUuid, data.credential);

    const dockeConfig: Dockerode = new Dockerode({host: 'http://192.168.99.100', port: 2376});

    // const credential = await this.CredentialsModule.getCredential(this.socket.request.session.uuid, data.credential);

    if (!dockerSessions[userUuid]) dockerSessions[userUuid] = {};
    if (!dockerSessions[userUuid][sessionUuid]) dockerSessions[userUuid][sessionUuid] = {};
    dockerSessions[userUuid][sessionUuid][data.uuid] = dockeConfig;

    return dockerSessions[userUuid][sessionUuid][data.uuid];
  }

  closeSession(userUuid: string, sessionUuid: string, connectionUuid: string): void {
    // TODO close?
    // @ts-ignore
    return dockerSessions[userUuid][sessionUuid][connectionUuid].close();
  }

  getSession(userUuid: string, sessionUuid: string, connectionUuid: string): Dockerode {
    return dockerSessions[userUuid][sessionUuid][connectionUuid];
  }

}
