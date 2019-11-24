import {Watch, KubeConfig} from '@kubernetes/client-node';
import {KubernetesSessionsModule} from './kubernetes-sessions';
import {SocketModule} from '../socket';

import {ConnectionKubernetes} from '../../../interfaces/socket-connections/connection-kubernetes';

export class KubernetesSocketModule {

  private KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule(this.socket);
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket) {

  }

  newConnection(data: ConnectionKubernetes) {

    this.KubernetesSessionsModule.createSession(data).then((kc: KubeConfig) => {
      const watch = new Watch(kc);
      const reqNamespaces = watch.watch('/api/v1/namespaces',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqNodes = watch.watch('/api/v1/nodes',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqPods = watch.watch('/api/v1/pods',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqCron = watch.watch('/apis/batch/v1beta1/cronjobs',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqDaemonsets = watch.watch('/apis/apps/v1/daemonsets',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqDeployments = watch.watch('/apis/apps/v1/deployments',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqJobs = watch.watch('/apis/batch/v1/jobs',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqReplicasets = watch.watch('/apis/apps/v1/replicasets',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqReplicationControllers = watch.watch('/api/v1/replicationcontrollers',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      const reqStatefullsets = watch.watch('/apis/apps/v1/statefulsets',
        {},
        (type, obj) => {
          this.SocketModule.emitData(data.type, data.uuid, {
            type,
            obj
          });
        },
        (err) => {
          // tslint:disable-next-line:no-console
          console.log(err);
        });

      this.SocketModule.emitProp(data.type, 'kubernetes@' + data.clusterServer, data.uuid, 'footer');
      this.SocketModule.emitProp(data.type, 'Kubernetes Connection Established', data.uuid, 'status');
      this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');
    });

  }
}
