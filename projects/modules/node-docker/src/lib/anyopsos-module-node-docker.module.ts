import {getSocketIO} from 'socket-controllers';
import * as Dockerode from 'dockerode';

import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSNodeDockerSessionStateModule} from './anyopsos-module-node-docker-session-state';

export class AnyOpsOSNodeDockerModule {

  private readonly DockerSessionStateModule: AnyOpsOSNodeDockerSessionStateModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {


    this.DockerSessionStateModule = new AnyOpsOSNodeDockerSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
  }

  /**
   * Creates a new connection
   */
  newConnection(): Promise<BackendResponse> {

    return this.DockerSessionStateModule.createSession().then(async (dockerConfig: Dockerode) => {

      const containers: Dockerode.ContainerInfo[] = await dockerConfig.listContainers();
      const images: Dockerode.ImageInfo[] = await dockerConfig.listImages();
      const services: Dockerode.ServiceSpec[] = await dockerConfig.listServices();
      const nodes: Dockerode.Node[] = await dockerConfig.listNodes();
      const tasks: Dockerode.Task[] = await dockerConfig.listTasks();
      const secrets: Dockerode.SecretInfo[] = await dockerConfig.listSecrets();
      const configs: Dockerode.ConfigInfo[] = await dockerConfig.listConfigs();
      const plugins: Dockerode.PluginInfo[] = await dockerConfig.listPlugins();
      const volumes: { Volumes: Dockerode.VolumeInspectInfo[]; Warnings: string[] } = await dockerConfig.listVolumes();
      const networks: Dockerode.NetworkInfo[] = await dockerConfig.listNetworks();

      getSocketIO().to(this.workspaceUuid).emit('[docker-data]', {
        connectionUuid: this.connectionUuid,
        data: [
          ...containers,
          ...images,
          ...services,
          ...nodes,
          ...tasks,
          ...secrets,
          ...configs,
          ...plugins,
          ...volumes.Volumes,
          ...networks
        ]
      });

      return {status: 'ok', data: 'connected'} as BackendResponse;
    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Disconnects a connection
   */
  disconnectConnection(): Promise<BackendResponse> {

    return this.DockerSessionStateModule.disconnectSession().then(() => {

      return {status: 'ok', data: 'disconnected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

}
