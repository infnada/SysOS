import {Socket} from 'socket.io';
import {KubeConfig, Watch, Log, Exec, Attach, V1Status} from '@kubernetes/client-node';
import {get, Response} from 'request';
import {Writable} from 'stream';
import {v4 as uuid} from 'uuid';
import WebSocket from 'isomorphic-ws';

import {AnyOpsOSTerminalModule} from '@anyopsos/module-terminal';
import {AnyOpsOSSocketModule} from '@anyopsos/module-socket';
import {BackendResponse} from '@anyopsos/backend/app/types/backend-response';

import {KubernetesSessionsModule} from './kubernetes-sessions';
import {ConnectionKubernetes} from './types/connection-kubernetes';
import {UserToSessionLogsMap} from './types/user-to-session-logs-map';
import {UserToSessionToShellMap} from './types/user-to-session-to-shell-map';

const logsRequests: UserToSessionLogsMap = {};
const shellWebSockets: UserToSessionToShellMap = {};

export class AnyOpsOSKubernetesModule {

  private readonly TerminalsModule: AnyOpsOSTerminalModule = new AnyOpsOSTerminalModule(this.socket);
  private readonly KubernetesSessionsModule: KubernetesSessionsModule = new KubernetesSessionsModule();
  private readonly SocketModule: AnyOpsOSSocketModule = new AnyOpsOSSocketModule(this.socket);

  constructor(private readonly socket: Socket) {

  }

  async getResource(userUuid: string, sessionUuid: string, connectionUuid: string, resourceUrl: string): Promise<string> {

    const kc: KubeConfig = this.KubernetesSessionsModule.getSession(userUuid, sessionUuid, connectionUuid);
    const opts = {
      url: kc.getCurrentCluster().server + resourceUrl
    };

    await kc.applyToRequest(opts);

    return new Promise((resolve, reject) => {
      get(kc.getCurrentCluster().server + resourceUrl, (opts as any), (error: any, response: Response, body: any) => {
        if (error) return reject(error);

        return resolve(body);
      });
    });
  }

  async newConnection(userUuid: string, sessionUuid: string, data: ConnectionKubernetes): Promise<BackendResponse> {

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

    const kc: KubeConfig = await this.KubernetesSessionsModule.createSession(userUuid, sessionUuid, data);
    const watch: Watch = new Watch(kc);

    // TODO this watcher should be created on createSession (and stopped at closeSession)
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

    return {status: 'ok', data: 'connected'};
  }

  /**
   * Container Logs managements
   */
  async getContainerLogs(
    userUuid: string,
    sessionUuid: string,
    connectionUuid: string,
    terminalUuid: string,
    namespace: string,
    pod: string,
    container: string,
    showContainerName: boolean
  ): Promise<string> {

    const kc: KubeConfig = this.KubernetesSessionsModule.getSession(userUuid, sessionUuid, connectionUuid);

    let timeout: NodeJS.Timer;
    let currentData = '';

    const log: Log = new Log(kc);
    const id = await uuid();

    const emitData = () => {
      if (!this.socket) return;

      this.TerminalsModule.terminalStout(terminalUuid, currentData);

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

    if (!logsRequests[userUuid]) logsRequests[userUuid] = {};
    if (!logsRequests[userUuid][sessionUuid]) logsRequests[userUuid][sessionUuid] = [];
    logsRequests[userUuid][sessionUuid].push({
      terminalUuid,
      logUuid: id,
      request: logRequest
    });

    return id;
  }

  finishContainerLogRequest(userUuid: string, sessionUuid: string, logUuid: string): void {
    const currentRequest = logsRequests[userUuid][sessionUuid].find((log) => log.logUuid === logUuid);

    if (currentRequest) currentRequest.request.abort();
  }

  finishAllContainersLogRequestByTerminalUuid(userUuid: string, sessionUuid: string, terminalUuid: string): void {
    logsRequests[userUuid][sessionUuid].filter((log) => log.terminalUuid === terminalUuid)
      .map(logRequest => logRequest.request.abort());
  }

  execToTerminal(
    userUuid: string,
    sessionUuid: string,
    connectionUuid: string,
    terminalUuid: string,
    namespace: string,
    pod: string,
    container: string,
    command: string | string[] = '/bin/sh'
  ): Promise<void> {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(userUuid, sessionUuid, terminalUuid);
    const kc: KubeConfig = this.KubernetesSessionsModule.getSession(userUuid, sessionUuid, connectionUuid);
    const exec: Exec = new Exec(kc);

    return exec.exec(namespace, pod, container, command, currentTerminal.stdout, currentTerminal.stdout, currentTerminal.stdin, true, (status: V1Status) => {
      // tslint:disable-next-line:no-console
      console.log('Exited with status:');
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(status, null, 2));
    }).then((websocket: WebSocket) => {

      if (!shellWebSockets[userUuid]) shellWebSockets[userUuid] = {};
      if (!shellWebSockets[userUuid][sessionUuid]) shellWebSockets[userUuid][sessionUuid] = [];
      shellWebSockets[userUuid][sessionUuid].push({
        terminalUuid,
        websocket
      });
    }).catch((e: Error) => {
      console.log(e);
    });
  }

  attachToTerminal(userUuid: string, sessionUuid: string, connectionUuid: string, terminalUuid: string, namespace: string, pod: string, container: string): Promise<void> {
    const currentTerminal = this.TerminalsModule.getTerminalByUuid(userUuid, sessionUuid, terminalUuid);
    const kc: KubeConfig = this.KubernetesSessionsModule.getSession(userUuid, sessionUuid, connectionUuid);
    const attach: Attach = new Attach(kc);

    return attach.attach(namespace, pod, container, currentTerminal.stdout, currentTerminal.stdout, currentTerminal.stdin, true).then((websocket: WebSocket) => {

      if (!shellWebSockets[userUuid]) shellWebSockets[userUuid] = {};
      if (!shellWebSockets[userUuid][sessionUuid]) shellWebSockets[userUuid][sessionUuid] = [];
      shellWebSockets[userUuid][sessionUuid].push({
        terminalUuid,
        websocket
      });
    }).catch((e: Error) => {
      console.log(e);
    });
  }

  finishTerminalShellRequest(userUuid: string, sessionUuid: string, terminalUuid: string): void {
    const currentWebSocket = shellWebSockets[userUuid][sessionUuid].find((shell) => shell.terminalUuid === terminalUuid);

    if (currentWebSocket) currentWebSocket.websocket.close();
  }

}
