import * as Dockerode from 'dockerode';

import {DockerSessionsModule} from './docker-sessions';
import {SocketModule} from '../socket';

import {ConnectionDocker} from '../../../interfaces/socket-connections/connection-docker';

export class DockerSocketModule {

  private dockerSessionsModule: DockerSessionsModule = new DockerSessionsModule(this.socket);
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket) {

  }

  newConnection(data: ConnectionDocker) {

    this.dockerSessionsModule.createSession(data).then(async (dockerode: Dockerode) => {
      const containers: Dockerode.ContainerInfo[] = await dockerode.listContainers();
      const images: Dockerode.ImageInfo[] = await dockerode.listImages();
      const services: Dockerode.ServiceSpec[] = await dockerode.listServices();
      const nodes: Dockerode.Node[] = await dockerode.listNodes();
      const tasks: Dockerode.Task[] = await dockerode.listTasks();
      const secrets: Dockerode.SecretInfo[] = await dockerode.listSecrets();
      const configs: Dockerode.ConfigInfo[] = await dockerode.listConfigs();
      const plugins: Dockerode.PluginInfo[] = await dockerode.listPlugins();
      const volumes: { Volumes: Dockerode.VolumeInspectInfo[]; Warnings: string[] } = await dockerode.listVolumes();
      const networks: Dockerode.NetworkInfo[] = await dockerode.listNetworks();

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
      this.SocketModule.emitProp(data.type, 'Docker ImConnection Established', data.uuid, 'status');
      this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');
    });

  }
}
