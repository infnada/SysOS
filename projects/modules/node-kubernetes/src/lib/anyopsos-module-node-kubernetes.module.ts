import {KubeConfig, Watch, Log, Exec, Attach, V1Status} from '@kubernetes/client-node';
import {Cluster} from '@kubernetes/client-node/dist/config_types';
import {get, Response, Options, Request} from 'request';
import {Readable, Writable} from 'stream';
import {getLogger, Logger} from 'log4js';

import {AnyOpsOSTerminalModule} from '@anyopsos/module-terminal';
import {BackendResponse} from '@anyopsos/backend-core/app/types/backend-response';

import {AnyOpsOSNodeKubernetesSessionStateModule} from './anyopsos-module-node-kubernetes-session-state';
import {AnyOpsOSNodeKubernetesDataRefresherModule} from './anyopsos-module-node-kubernetes-data-refresher';

import {IsomorphicWs} from './types/isomorphic-ws';


const logger: Logger = getLogger('mainLog');

export class AnyOpsOSNodeKubernetesModule {

  private readonly KubernetesSessionStateModule: AnyOpsOSNodeKubernetesSessionStateModule;
  private readonly KubernetesDataRefresherModule: AnyOpsOSNodeKubernetesDataRefresherModule;
  private readonly TerminalsModule: AnyOpsOSTerminalModule;

  constructor(private readonly userUuid: string,
              private readonly sessionUuid: string,
              private readonly workspaceUuid: string,
              private readonly connectionUuid: string) {

    this.KubernetesSessionStateModule = new AnyOpsOSNodeKubernetesSessionStateModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.KubernetesDataRefresherModule = new AnyOpsOSNodeKubernetesDataRefresherModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);
    this.TerminalsModule = new AnyOpsOSTerminalModule(this.userUuid, this.sessionUuid, this.workspaceUuid, this.connectionUuid);

  }

  /**
   * Creates a new connection
   */
  newConnection(): Promise<BackendResponse> {

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
      // '/api/v1/events',
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

    return this.KubernetesSessionStateModule.createSession().then(async (kc: KubeConfig) => {

      await this.KubernetesDataRefresherModule.createConnectionFolders();

      const watch: Watch = new Watch(kc);
      apiUrls.forEach((url: string) => {

        watch.watch(url,
          {},
          (phase: string, obj: any) => {

            this.KubernetesDataRefresherModule.parseObject(phase, obj);
          },
          (e: Error) => {
            logger.error(`[Module Kubernetes] -> Watch error apiUrl [${url}] -> ${e}`);
          });

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

    return this.KubernetesSessionStateModule.disconnectSession().then(() => {

      return {status: 'ok', data: 'disconnected'} as BackendResponse;

    }).catch((e: Error) => {
      throw e;
    });
  }

  /**
   * Returns a Kubernetes resource
   */
  async getResource(resourceUrl: string): Promise<string> {

    const kc: KubeConfig = this.KubernetesSessionStateModule.getSession();
    const kcCluster: Cluster | null = kc.getCurrentCluster();

    if (!kcCluster) throw new Error('invalid_resource');

    const options: Options = {
      url: kcCluster.server + resourceUrl
    };

    await kc.applyToRequest(options);

    return new Promise((resolve, reject) => {
      get(kcCluster.server + resourceUrl, options, (e: Error, response: Response, body: any) => {
        if (e) return reject(e);

        return resolve(body);
      });
    });
  }

  /**
   * Container Logs management
   */
  async getContainerLogs(terminalUuid: string, namespace: string, pod: string, container: string, showContainerName: boolean): Promise<string> {
    let timeout: NodeJS.Timer;
    let currentData = '';

    const emitData = () => {
      this.TerminalsModule.terminalStout(terminalUuid, currentData);
      currentData = '';
    };

    const stdout: Writable = new Writable({
      write(chunk, encoding, callback) {

        currentData += (showContainerName ? `\u001b[94m${pod} - ${container}:\u001b[39m ` : '') + chunk.toString() + '\r';

        clearTimeout(timeout);
        timeout = setTimeout(emitData, 250);

        callback();
      }
    });

    this.TerminalsModule.setTerminalStream(terminalUuid, undefined, stdout);

    const kc: KubeConfig = this.KubernetesSessionStateModule.getSession();
    const log: Log = new Log(kc);

    const logRequest: Request = log.log(namespace, pod, container, stdout, (err: any) => {
      console.log(err);
    }, {
      follow: true
    });

    stdout.on('close', (code: number | null, signal: string) => {
      logRequest.abort()
    });

    return terminalUuid;
  }

  execToTerminal(terminalUuid: string, namespace: string, pod: string, container: string, command: string | string[] = '/bin/sh'): Promise<void> {

    const emitData = (termUuid: string, data: string) => this.TerminalsModule.terminalStout(termUuid, data);
    const stdin = new Readable({read: () => {}});
    const stdout = new Writable({
      write(chunk: any, encoding: string, callback: () => void) {
        emitData(terminalUuid, chunk.toString());
        callback();
      }
    });

    this.TerminalsModule.setTerminalStream(terminalUuid, undefined, stdout, stdin);

    const kc: KubeConfig = this.KubernetesSessionStateModule.getSession();
    const exec: Exec = new Exec(kc);

    return exec.exec(namespace, pod, container, command, stdout, stdout, stdin, true, (status: V1Status) => {
      // tslint:disable-next-line:no-console
      console.log('Exited with status:');
      // tslint:disable-next-line:no-console
      console.log(JSON.stringify(status, null, 2));

    // @ts-ignore TODO
    }).then((websocket: IsomorphicWs) => {

      stdout.on('close', (code: number | null, signal: string) => {
        websocket.close();
      });

    }).catch((e: Error) => {
      console.log(e);
    });
  }

  attachToTerminal(terminalUuid: string, namespace: string, pod: string, container: string): Promise<void> {

    const emitData = (termUuid: string, data: string) => this.TerminalsModule.terminalStout(termUuid, data);
    const stdin = new Readable({read: () => {}});
    const stdout = new Writable({
      write(chunk: any, encoding: string, callback: () => void) {
        emitData(terminalUuid, chunk.toString());
        callback();
      }
    });

    this.TerminalsModule.setTerminalStream(terminalUuid, undefined, stdout, stdin);

    const kc: KubeConfig = this.KubernetesSessionStateModule.getSession();
    const attach: Attach = new Attach(kc);

    return attach.attach(namespace, pod, container, stdout, stdout, stdin, true)
    // @ts-ignore TODO
    .then((websocket: IsomorphicWs) => {

      stdout.on('close', (code: number | null, signal: string) => {
        websocket.close();
      });

    }).catch((e: Error) => {
      console.log(e);
    });
  }

}
