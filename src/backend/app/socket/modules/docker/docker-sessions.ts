import Dockerode from 'dockerode';

import {CredentialsModule} from '../../../routes/modules/credentials';
import {ConnectionDocker} from '../../../interfaces/socket-connections/connection-docker';

const dockerSessions: Dockerode[] = [];

export class DockerSessionsModule {

  private CredentialsModule: CredentialsModule = new CredentialsModule();

  constructor(private socket: any) {

  }

  async createSession(data: ConnectionDocker): Promise<Dockerode>  {

    const dockerode: Dockerode = new Dockerode({host: 'http://192.168.99.100', port: 2376});

    // const credential = await this.CredentialsModule.getCredential(this.socket.request.session.uuid, data.credential);

    dockerSessions[data.uuid] = dockerode;

    return dockerSessions[data.uuid];
  }

  closeSession(uuid: string): void {
    return dockerSessions[uuid].close();
  }

  async getAllSessions(): Promise<any> {
    return dockerSessions;
  }

  getSession(uuid: string): Dockerode {
    return dockerSessions[uuid];
  }

}
