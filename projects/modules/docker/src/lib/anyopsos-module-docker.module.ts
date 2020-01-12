import {Socket} from 'socket.io';
import * as Dockerode from 'dockerode';

import {AnyOpsOSSocketModule} from '@anyopsos/module-socket';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {DockerSessionsModule} from './docker-sessions';

import {ConnectionDocker} from './types/connection-docker';

export class AnyOpsOSDockerModule {

  private readonly DockerSessionsModule: DockerSessionsModule = new DockerSessionsModule();
  private readonly SocketModule: AnyOpsOSSocketModule = new AnyOpsOSSocketModule(this.socket);

  constructor(private readonly socket: Socket) {
  }

  newConnection(userUuid: string, sessionUuid: string, data: ConnectionDocker): Promise<BackendResponse> {

    return this.DockerSessionsModule.createSession(userUuid, sessionUuid, data).then(async (dockerConfig: Dockerode) => {
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

      this.SocketModule.emitData(data.type, data.uuid, [
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
      ]);

      this.SocketModule.emitProp(data.type, 'docker@' + data.clusterServer, data.uuid, 'footer');
      this.SocketModule.emitProp(data.type, 'Docker Connection Established', data.uuid, 'status');
      this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');

      return {status: 'ok', data: 'connected'} as BackendResponse;
    });

  }

}
