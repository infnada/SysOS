import {Injectable} from '@angular/core';

import {ImDataObject} from '../types/im-data-object';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerTemplateHelperService {

  constructor() {
  }

  getObjectIcon(object: ImDataObject): { type: 'class' | 'image'; data: string} {
    if (object.type === 'standalone') return {type: 'class', data: 'mr-1 text-primary fas fa-folder'};
    if (object.type === 'linux') return {type: 'class', data: 'mr-1 text-primary fab fa-linux'};
    if (object.type === 'windows') return {type: 'class', data: 'mr-1 text-primary fab fa-windows'};
    if (object.type === 'snmp') return {type: 'class', data: 'mr-1 text-primary fas fa-desktop'};
    if (object.type === 'container') return {type: 'class', data: 'mr-1 text-primary fas fa-box'};
    if (object.type === 'storage') return {type: 'class', data: 'mr-1 text-primary fas fa-database'};
    if (object.type === 'virtual') return {type: 'class', data: 'mr-1 text-primary fas fa-cloud'};

    // VMWARE
    if (object.type === 'vmware') return {type: 'class', data: 'vs-icon vsphere-icon-vcenter'};
    if (object.type === 'Datacenter') return {type: 'class', data: 'vs-icon vsphere-icon-datacenter'};
    if (object.type === 'ClusterComputeResource') return {type: 'class', data: 'vs-icon vsphere-icon-cluster'};
    if (object.type === 'HostSystem') {
      return (object.info.data.runtime.powerState === 'poweredOff' ? {type: 'class', data: 'vs-icon vsphere-icon-host-disconnected'} :
          object.info.data.runtime.powerState === 'poweredOn' ? {type: 'class', data: 'vs-icon vsphere-icon-host'} :
            {type: 'class', data: 'vs-icon vsphere-icon-host'}
      );
    }
    if (object.type === 'Folder') return {type: 'class', data: 'vs-icon vsphere-icon-folder'};
    if (object.type === 'ResourcePool') return {type: 'class', data: 'vs-icon vsphere-icon-resource-pool'};
    if (object.type === 'VirtualApp') return {type: 'class', data: 'vs-icon vsphere-icon-vapp'};
    if (object.type === 'VirtualMachine') {
      return (object.info.data['runtime.powerState'] === 'poweredOff' ? {type: 'class', data: 'vs-icon vsphere-icon-vm'} :
          object.info.data['runtime.powerState'] === 'poweredOn' ? {type: 'class', data: 'vs-icon vsphere-icon-vm-on'} :
            object.info.data['runtime.powerState'] === 'suspended' ? {type: 'class', data: 'vs-icon vsphere-icon-vm-suspended'} :
              object.info.data['runtime.connectionState'] === 'inaccessible' ? {type: 'class', data: 'vs-icon vsphere-icon-vm-error'} :
                {type: 'class', data: 'vs-icon vsphere-icon-vm'}
      );
    }
    if (object.type === 'StoragePod') return {type: 'class', data: 'vs-icon vsphere-icon-datastore-cluster'};
    if (object.type === 'Datastore') {
      return (object.info.data['summary.accessible'] === 'true' ? {type: 'class', data: 'vs-icon vsphere-icon-datastore'} :
          object.info.data['summary.accessible'] === 'false' ? {type: 'class', data: 'vs-icon vsphere-icon-datastore-inaccessible'} :
            {type: 'class', data: 'vs-icon vsphere-icon-datastore'}
      );
    }
    if (object.type === 'Network') return {type: 'class', data: 'vs-icon vsphere-icon-network'};
    if (object.type === 'VmwareDistributedVirtualSwitch') return {type: 'class', data: 'vs-icon vsphere-icon-dv-switch'};
    if (object.type === 'DistributedVirtualPortgroup') return {type: 'class', data: 'vs-icon vsphere-icon-virtual-port-group'};

    // NETAPP
    if (object.type === 'netapp') return {type: 'image', data: '/assets/img/logos/NetApp-logo.png'};
    if (object.type === 'vserver') return {type: 'class', data: 'mr-1 fas fa-server'};
    if (object.type === 'volume') return {type: 'image', data: 'vs-icon vsphere-icon-datastore'};
    if (object.type === 'snapshot') return {type: 'class', data: 'mr-1 fas fa-camera'};

    // KUBERNETES
    if (object.type === 'docker') return {type: 'class', data: 'mr-1 text-primary fas fa-docker'};

    // DOCKER
    if (object.type === 'kubernetes') return {type: 'image', data: '/assets/img/logos/Kubernetes-logo.png'};
    if (object.type === 'Namespace') return {type: 'image', data: '/assets/img/kubernetes/ns-128.png'};
    if (object.type === 'DaemonSet') return {type: 'image', data: '/assets/img/kubernetes/ds-128.png'};
    if (object.type === 'Deployment') return {type: 'image', data: '/assets/img/kubernetes/deploy-128.png'};
    if (object.type === 'StatefulSet') return {type: 'image', data: '/assets/img/kubernetes/sts-128.png'};
    if (object.type === 'ReplicaSet') return {type: 'image', data: '/assets/img/kubernetes/rs-128.png'};
    if (object.type === 'Pod') return {type: 'image', data: '/assets/img/kubernetes/pod-128.png'};
    if (object.type === 'Job') return {type: 'image', data: '/assets/img/kubernetes/job-128.png'};
    if (object.type === 'CronJob') return {type: 'image', data: '/assets/img/kubernetes/cronjob-128.png'};
    if (object.type === 'Node') return {type: 'image', data: '/assets/img/kubernetes/node-128.png'};
    if (object.type === 'ControllerRevision') return {type: 'image', data: '/assets/img/kubernetes/node-128.png'};
    if (object.type === 'VolumeAttachment') return {type: 'image', data: '/assets/img/kubernetes/node-128.png'};
    if (object.type === 'StorageClass') return {type: 'image', data: '/assets/img/kubernetes/sc-128.png'};
    if (object.type === 'PersistentVolume') return {type: 'image', data: '/assets/img/kubernetes/pv-128.png'};
    if (object.type === 'PersistentVolumeClaim') return {type: 'image', data: '/assets/img/kubernetes/pvc-128.png'};
    if (object.type === 'NetworkPolicy') return {type: 'image', data: '/assets/img/kubernetes/netpol-128.png'};
    if (object.type === 'Ingress') return {type: 'image', data: '/assets/img/kubernetes/ing-128.png'};
    if (object.type === 'Endpoints') return {type: 'image', data: '/assets/img/kubernetes/ep-128.png'};
    if (object.type === 'Service') return {type: 'image', data: '/assets/img/kubernetes/svc-128.png'};
    if (object.type === 'ConfigMap') return {type: 'image', data: '/assets/img/kubernetes/cm-128.png'};
    if (object.type === 'Secret') return {type: 'image', data: '/assets/img/kubernetes/secret-128.png'};
    if (object.type === 'ServiceAccount') return {type: 'image', data: '/assets/img/kubernetes/sa-128.png'};
    if (object.type === 'Role') return {type: 'image', data: '/assets/img/kubernetes/role-128.png'};
    if (object.type === 'RoleBinding') return {type: 'image', data: '/assets/img/kubernetes/rb-128.png'};
    if (object.type === 'ClusterRole') return {type: 'image', data: '/assets/img/kubernetes/c-role-128.png'};
    if (object.type === 'ClusterRoleBinding') return {type: 'image', data: '/assets/img/kubernetes/crb-128.png'};

    return {type: 'image', data: ''};
  }

}
