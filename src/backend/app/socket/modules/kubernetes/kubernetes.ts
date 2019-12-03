import {V1Status, Watch, KubeConfig, Log, Exec, Attach} from '@kubernetes/client-node';
import {Writable} from 'stream';
import {Request} from 'request';
import WebSocket from 'isomorphic-ws';
import uuid from 'uuid';

import {ConnectionKubernetes} from '../../../interfaces/socket-connections/connection-kubernetes';
import {KubernetesSessionsModule} from './kubernetes-sessions';
import {TerminalsModule} from '../terminals';
import {SocketModule} from '../socket';

const logsRequests: {
  terminalUuid: string;
  logUuid: string;
  request: Request
}[] = [];

const shellWebSockets: {
  terminalUuid: string;
  websocket: WebSocket
}[] = [];

export class KubernetesSocketModule {

  private TerminalsModule: TerminalsModule = new TerminalsModule(this.socket);
  private KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule(this.socket);
  private SocketModule: SocketModule = new SocketModule(this.socket);

  constructor(private socket) {
  }

  newConnection(data: ConnectionKubernetes): void {

    // https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.16
    const apiUrls = [
      // WORKLOADS APIS
      '/apis/batch/v1beta1/cronjobs',
      '/apis/apps/v1/daemonsets',
      '/apis/apps/v1/deployments',
      '/apis/batch/v1/jobs',
      '/api/v1/pods',
      '/apis/apps/v1/replicasets',
      '/api/v1/replicationcontrollers',
      '/apis/apps/v1/statefulsets',
      // SERVICE APIS
      '/api/v1/endpoints',
      '/apis/discovery.k8s.io/v1alpha1/endpointslices',
      '/apis/networking.k8s.io/v1beta1/ingresses',
      '/api/v1/services',
      // CONFIG AND STORAGE APIS
      '/api/v1/configmaps',
      '/apis/storage.k8s.io/v1beta1/csidrivers',
      '/apis/storage.k8s.io/v1beta1/csinodes',
      '/api/v1/secrets',
      '/api/v1/persistentvolumeclaims',
      '/apis/storage.k8s.io/v1/storageclasses',
      '/apis/storage.k8s.io/v1/volumeattachments',
      // METADATA APIS
      '/apis/apps/v1/controllerrevisions',
      '/apis/apiextensions.k8s.io/v1/customresourcedefinitions',
      '/api/v1/events',
      '/api/v1/limitranges',
      '/apis/autoscaling/v1/horizontalpodautoscalers',
      '/apis/admissionregistration.k8s.io/v1/mutatingwebhookconfigurations',
      '/apis/admissionregistration.k8s.io/v1/validatingwebhookconfigurations',
      '/api/v1/podtemplates',
      '/apis/policy/v1beta1/poddisruptionbudgets',
      '/apis/scheduling.k8s.io/v1/priorityclasses',
      '/apis/settings.k8s.io/v1alpha1/podpresets',
      '/apis/policy/v1beta1/podsecuritypolicies',
      // CLUSTER APIS
      '/apis/apiregistration.k8s.io/v1/apiservices',
      '/apis/auditregistration.k8s.io/v1alpha1/auditsinks',
      '/apis/certificates.k8s.io/v1beta1/certificatesigningrequests',
      '/apis/rbac.authorization.k8s.io/v1/clusterroles',
      '/apis/rbac.authorization.k8s.io/v1/clusterrolebindings',
      '/api/v1/componentstatuses',
      '/apis/coordination.k8s.io/v1/leases',
      '/api/v1/namespaces',
      '/api/v1/nodes',
      '/api/v1/persistentvolumes',
      '/api/v1/resourcequotas',
      '/apis/rbac.authorization.k8s.io/v1/roles',
      '/apis/rbac.authorization.k8s.io/v1/rolebindings',
      '/apis/node.k8s.io/v1beta1/runtimeclasses',
      '/api/v1/serviceaccounts',
      '/apis/networking.k8s.io/v1/networkpolicies'
    ];

    this.KubernetesSessionsModule.createSession(data).then((kc: KubeConfig) => {
      const watch: Watch = new Watch(kc);

      apiUrls.forEach((url: string) => {
        watch.watch(url,
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
      });

      this.SocketModule.emitProp(data.type, 'kubernetes@' + data.clusterServer, data.uuid, 'footer');
      this.SocketModule.emitProp(data.type, 'Kubernetes Connection Established', data.uuid, 'status');
      this.SocketModule.emitProp(data.type, 'connected', data.uuid, 'state');
    });

  }

  /**
   * Container Logs managements
   */
  getContainerLogs(connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string, showContainerName: boolean): Promise<string> {
    return this.KubernetesSessionsModule.getSession(connectionUuid).then(async (kc: KubeConfig) => {

      let timeout;
      let currentData = '';

      const log: Log = new Log(kc);
      const id = await uuid();

      const emitData = () => {
        if (!this.socket) return;

        this.TerminalsModule.terminalStout({
          uuid: terminalUuid,
          data: currentData
        });

        currentData = '';
      };

      // Don't use default terminal.stdout stream because we need the container name
      const logStream: Writable = new Writable({
        write(chunk, encoding, callback) {

          currentData += (showContainerName ? `\u001b[94m${pod} - ${container}:\u001b[39m ` : '') + chunk.toString() + '\r';

          clearTimeout(timeout);
          timeout = setTimeout(emitData, 250);

          callback();
        }
      });

      const logRequest = log.log(namespace, pod, container, logStream, (err: any) => {
        console.log(err);
      }, {
        follow: true
      });

      logsRequests.push({
        terminalUuid,
        logUuid: id,
        request: logRequest
      });

      return id;
    });
  }

  async finishContainerLogRequest(logUuid: string): Promise<void> {
    const currentRequest = logsRequests.find((log) => {
      return log.logUuid === logUuid;
    });

    if (currentRequest) currentRequest.request.abort();
  }

  async finishAllContainersLogRequestByTerminalUuid(terminalUuid: string): Promise<void> {
    await logsRequests.filter((log) => {
      return log.terminalUuid === terminalUuid;
    }).map(logRequest => logRequest.request.abort());
  }

  execToTerminal(connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string, command: string|string[] = '/bin/sh') {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(terminalUuid);

    return this.KubernetesSessionsModule.getSession(connectionUuid).then((kc: KubeConfig) => {
      const exec: Exec = new Exec(kc);

      exec.exec(namespace, pod, container, command, currentTerminal.stdout, currentTerminal.stdout, currentTerminal.stdin, true, (status: V1Status) => {
        // tslint:disable-next-line:no-console
        console.log('Exited with status:');
        // tslint:disable-next-line:no-console
        console.log(JSON.stringify(status, null, 2));
      }).then((websocket: WebSocket) => {
        shellWebSockets.push({
          terminalUuid,
          websocket
        });
      }).catch((e) => {
        console.log(e);
      });
    });
  }

  attachToTerminal(connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string) {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(terminalUuid);

    return this.KubernetesSessionsModule.getSession(connectionUuid).then((kc: KubeConfig) => {
      const attach: Attach = new Attach(kc);

      attach.attach(namespace, pod, container, currentTerminal.stdout, currentTerminal.stdout, currentTerminal.stdin, true).then((websocket: WebSocket) => {
        shellWebSockets.push({
          terminalUuid,
          websocket
        });
      }).catch((e) => {
        console.log(e);
      });
    });
  }

  async finishTerminalShellRequest(terminalUuid: string): Promise<void> {
    const currentWebSocket = shellWebSockets.find((shell) => {
      return shell.terminalUuid === terminalUuid;
    });

    if (currentWebSocket) currentWebSocket.websocket.close();
  }
}
