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
      const watch = new Watch(kc);

      apiUrls.forEach(url => {
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
}
