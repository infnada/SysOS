import * as Dockerode from 'dockerode';

import {AnyOpsOSWorkspaceModule} from '@anyopsos/module-workspace';
import {AnyOpsOSConfigFileModule} from '@anyopsos/module-config-file';
import {AnyOpsOSCredentialModule} from '@anyopsos/module-credential';

import {ConnectionDocker} from './types/connection-docker';
import {ConnectionDockerServer} from './types/connection-docker-server';
import {WorkspaceToDockerMap} from './types/workspace-to-docker-map';

import {DOCKER_CONFIG_FILE} from './anyopsos-module-docker.constants';


const dockerSessions: WorkspaceToDockerMap = {};

export class AnyOpsOSDockerSessionStateModule {

  private readonly WorkspaceModule: AnyOpsOSWorkspaceModule;
  private readonly ConfigFileModule: AnyOpsOSConfigFileModule;
  private readonly CredentialModule: AnyOpsOSCredentialModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.WorkspaceModule = new AnyOpsOSWorkspaceModule(this.userUuid, this.sessionUuid);
    this.ConfigFileModule = new AnyOpsOSConfigFileModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
    this.CredentialModule = new AnyOpsOSCredentialModule(this.userUuid, this.sessionUuid, this.workspaceUuid);
  }

  async createSession(): Promise<Dockerode>  {
    if (!dockerSessions[this.workspaceUuid]) dockerSessions[this.workspaceUuid] = {};

    const mainServer: ConnectionDockerServer = await this.getConnectionMainServer();

    // @ts-ignore TODO
    const dockerConfig: Dockerode = new Dockerode({host: 'http://192.168.99.100', port: 2376});

    dockerSessions[this.workspaceUuid][this.connectionUuid] = dockerConfig;
    return dockerSessions[this.workspaceUuid][this.connectionUuid];
  }

  async disconnectSession(): Promise<void> {
    // TODO
    // return dockerSessions[this.workspaceUuid][this.connectionUuid].close();
  }

  /**
   * Returns a Docker session
   */
  getSession(): Dockerode {
    if (!dockerSessions[this.workspaceUuid]?.[this.connectionUuid]) throw new Error('resource_invalid');

    return dockerSessions[this.workspaceUuid][this.connectionUuid];
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnection(): Promise<ConnectionDocker> {
    return this.ConfigFileModule.get(DOCKER_CONFIG_FILE, this.connectionUuid) as Promise<ConnectionDocker>;
  }

  /**
   * Returns the connection data from workspaceUuid & connectionUuid
   */
  async getConnectionMainServer(): Promise<ConnectionDockerServer> {
    const connectionData: ConnectionDocker = await this.getConnection();

    return {
      clusterName: connectionData.clusterName,
      clusterServer: connectionData.clusterServer,
      clusterCa: connectionData.clusterCa,
      credential: await this.CredentialModule.getCredential(connectionData.credential)
    };

  }

}
