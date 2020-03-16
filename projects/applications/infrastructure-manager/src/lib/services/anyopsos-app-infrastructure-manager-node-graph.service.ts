import {Injectable} from '@angular/core';

import {AnyOpsOSLibNodeHelpersService} from '@anyopsos/lib-node';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';
import {DataObject} from '@anyopsos/backend-core/app/types/data-object';

import {ImTreeNode} from '../types/im-tree-node';
import {ImGraphNode} from '../types/im-graph-node';
import {ImGraphNodeMetric} from '../types/im-graph-node-metric';
import {NodeGraphNodeMetadata} from '../types/node-graph-node-metadata';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerNodeGraphService {

  private graphType: string;
  private nodes: ImGraphNode[];
  private mainNode: DataObject;

  constructor(private readonly LibNodeHelpers: AnyOpsOSLibNodeHelpersService) {
  }

  private setPseudoNodes(nodes): { nodes: { [key: string]: ImTreeNode } } {
    nodes.nodes['pseudo:virtual:'] = {
      id: 'pseudo:virtual:',
      label: 'Virtual',
      labelMinor: 0,
      rank: 'virtual:',
      shape: 'square',
      stack: true,
      pseudo: true,
      adjacency: [
        'pseudo:virtual:'
      ]
    };

    nodes.nodes['pseudo:storage:'] = {
      id: 'pseudo:storage:',
      label: 'Storage',
      labelMinor: 0,
      rank: 'storage:',
      shape: 'square',
      stack: true,
      pseudo: true,
      adjacency: [
        'pseudo:storage:'
      ]
    };

    nodes.nodes['pseudo:container:'] = {
      id: 'pseudo:container:',
      label: 'Container',
      labelMinor: 0,
      rank: 'container:',
      shape: 'square',
      stack: true,
      pseudo: true,
      adjacency: [
        'pseudo:container:'
      ]
    };

    return nodes;
  }


  /**
   * Adjacency
   * ---------
   */

  /**
   * For each adjacent nodeId, get->set the node
   */
  private setAdjacentNodes(mainObj: DataObject): void {
    for (const adjacentUuid of this.nodes.find(n => n.id === mainObj.info.uuid).adjacency) {

      const currentAdjacentNode: DataObject = this.LibNodeHelpers.getObjectByUuid(null, null, adjacentUuid);

      if (currentAdjacentNode) this.setNode(currentAdjacentNode);
    }
  }

  /**
   * Gets adjacent Parents from a node
   */
  private getAdjacentParent(objData: DataObject): string | void {

    // Is main object. Connect to pseudo
    if (!objData.info) {
      return `pseudo:${(objData.type === 'vmware' ? 'virtual' : objData.type === 'netapp' ? 'storage' : objData.type === 'kubernetes' ? 'container' : '')}:`;

    // Have parent connect to it
    } else if (objData.info.parent) {
      if (objData.info.parent.type === 'Folder') return;

      const connectionType: ConnectionTypes['type'] = this.LibNodeHelpers.extractMainTypeFromObjectUuid(objData.info.uuid);

      return `${objData.info.mainUuid}#${connectionType};\u003c${objData.info.parent.name}:${objData.info.parent.type}\u003e`;

    // Don't have parent, connect to main object
    } else {
      return objData.info.mainUuid;
    }
  }

  /**
   * Gets adjacent Childrens from a node
   */
  private getAdjacentChildrens(objData: DataObject): string[] {
    if (!objData.info) return [];

    const connectionType: ConnectionTypes['type'] = this.LibNodeHelpers.extractMainTypeFromObjectUuid(objData.info.uuid);
    const childObjects: DataObject[] = this.LibNodeHelpers.getChildObjects(objData.info.mainUuid, connectionType, objData.info.obj, false);

    return childObjects
      .filter(obj => obj.type !== 'Event' && obj.type !== 'Folder')
      .map(obj => obj.info.uuid);
  }

  /**
   * VMWare Adjacent
   * ---------
   */

  /**
   * Gets adjacent VMs from a HostSystem/Datastore node
   */
  private getAdjacentVMs(objData: DataObject): string[] {
    const adjacentVMs = [];

    if (objData.info.data.vm && objData.info.data.vm[0].ManagedObjectReference) {
      // Connect to VMs
      if (Array.isArray(objData.info.data.vm[0].ManagedObjectReference)) {
        Array.isArray(objData.info.data.vm[0].ManagedObjectReference.forEach((vmData) => {
          adjacentVMs.push(`${objData.info.mainUuid}#vmware;\u003c${vmData.name}:${vmData.type}\u003e`);
        }));
      } else {
        adjacentVMs.push(`${objData.info.mainUuid}#vmware;\u003c${objData.info.data.vm[0].ManagedObjectReference.name}:${objData.info.data.vm[0].ManagedObjectReference.type}\u003e`);
      }

      return adjacentVMs;
    }

    return adjacentVMs;
  }

  /**
   * Returns StoragePods from a HostSystem node
   */
  // TODO
  private getAdjacentStoragePods(objData: DataObject): string[] {
    return [];
  }

  /**
   * Gets adjacent Datastores from a HostSystem/StoragePod node
   */
  private getAdjacentDatastores(objData: DataObject): string[] {

    if (objData.type === 'StoragePod') {
      const childObjects: DataObject[] = this.LibNodeHelpers.getChildObjectsByType(objData.info.mainUuid, 'vmware', 'Datastore', objData.info.obj);
      return childObjects.map(obj => obj.info.uuid);
    }

    if (objData.type === 'HostSystem') {
      const adjacentDatastores = [];

      if (objData.info.data.datastore[0].ManagedObjectReference) {
        // Connect to Datastores
        if (Array.isArray(objData.info.data.datastore[0].ManagedObjectReference)) {
          Array.isArray(objData.info.data.datastore[0].ManagedObjectReference.forEach((datastoreData) => {
            adjacentDatastores.push(`${objData.info.mainUuid}#vmware;\u003c${datastoreData.name}:${datastoreData.type}\u003e`);
          }));
        } else {
          adjacentDatastores.push(`${objData.info.mainUuid}#vmware;\u003c${objData.info.data.datastore[0].ManagedObjectReference.name}:${objData.info.data.datastore[0].ManagedObjectReference.type}\u003e`);
        }

        return adjacentDatastores;
      }
    }

    return [];
  }

  /**
   * Special use/case
   * Since VM Disks are not connection objects, we inspect directly the VM to get the disks information.
   * Gets and returns nodes and adjacent Disks from VM object
   */
  private getAdjacentDisks(objData: DataObject): string[] {
    const adjacentDisks = [];

    if (objData.info.data['config.hardware.device'][0].VirtualDevice) {

      for (const device of objData.info.data['config.hardware.device'][0].VirtualDevice) {

        if (device.xsi_type === 'VirtualDisk') {
          const diskId = `${objData.info.mainUuid}#vmware;\u003c${device.backing[0].uuid}:${device.xsi_type}\u003e`;
          const datastoreId = `${objData.info.mainUuid}#vmware;\u003c${device.backing[0].datastore.name}:${device.backing[0].datastore.type}\u003e`;

          // Calculate disk usage
          const diskChain = objData.info.data.layoutEx[0].disk.find((disk) => {
            return disk.key === device.key;
          }).chain[0].fileKey;

          const diskUsage = objData.info.data.layoutEx[0].file.filter(file => diskChain.includes(file.key)).reduce((sum, { size }: { size: string } ) => {
            return sum + parseInt(size, 10);
          }, 0);

          adjacentDisks.push(diskId);

          // Set special VirtualDisk node
          this.nodes.push({
            id: diskId,
            nodeInfo: device,
            label: device.deviceInfo[0].label,
            labelMinor: device.xsi_type,
            rank: device.xsi_type + '/' + device.backing[0].diskMode,
            shape: this.getShapeByType(device.xsi_type),
            stack: false,
            metadata: [
              {
                id: 'node_type',
                label: 'Type',
                value: device.xsi_type,
                priority: 1
              }
            ],
            metrics: [
              {
                id: 'disk_total_usage',
                label: 'Disk',
                format: 'filesize',
                value: diskUsage,
                priority: 1,
                samples: null,
                min: 0,
                max: device.capacityInBytes,
                url: ''
              }
            ],
            adjacency: [
              // Datastore
              datastoreId
            ]
          });

          // Set Datastore node
          const currentAdjacentNode: DataObject = this.LibNodeHelpers.getObjectByUuid(objData.info.mainUuid, 'vmware', datastoreId);
          this.setNode(currentAdjacentNode);
        }

      }

    }

    return adjacentDisks;
  }

  /**
   * Special use/case
   * Since VM Networks are not connection objects, we inspect directly the VM to get the networks information.
   * Gets and returns nodes and adjacent Networks from VM object
   */
  private getAdjacentNetworks(objData: DataObject): string[] {
    const adjacentNetworks = [];

    if (objData.info.data['config.hardware.device'][0].VirtualDevice) {

      for (const device of objData.info.data['config.hardware.device'][0].VirtualDevice) {

        if (device.xsi_type === 'VirtualVmxnet3' || device.xsi_type === 'VirtualE1000e') {
          const nicId = `${objData.info.mainUuid}#vmware;\u003c${device.macAddress}:${device.xsi_type}\u003e`;
          const networkId = `${objData.info.mainUuid}#vmware;\u003c${device.backing[0].network.name}:${device.backing[0].network.type}\u003e`;

          adjacentNetworks.push(nicId);

          // Set special VirtualDisk node
          this.nodes.push({
            id: nicId,
            nodeInfo: device,
            label: device.deviceInfo[0].label,
            labelMinor: device.deviceInfo[0].summary,
            rank: device.xsi_type,
            shape: this.getShapeByType(device.xsi_type),
            stack: false,
            metadata: [
              {
                id: 'node_type',
                label: 'Type',
                value: device.xsi_type,
                priority: 1
              },
            ],
            metrics: [],
            adjacency: [
              // Network
              networkId
            ]
          });

          // Set Network node
          const currentAdjacentNetworkNode: DataObject = this.LibNodeHelpers.getObjectByUuid(objData.info.mainUuid, 'vmware', networkId);
          this.setNode(currentAdjacentNetworkNode);
        }

      }

    }

    return adjacentNetworks;
  }

  /**
   * Kubernetes Adjacent
   * ---------
   */

  /**
   * Gets adjacent ConfigMaps from a Pod node
   */
  private getAdjacentConfigMaps(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
      return imObj.type === 'ConfigMap' &&
        imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace &&
        (
          objData.info.data.spec.containers.some(containerObj => (
            containerObj.envFrom && containerObj.envFrom.some(envFromObj => envFromObj.configMapRef && envFromObj.configMapRef.name === imObj.name) ||
            containerObj.env && containerObj.env.some(envObj => envObj.valueFrom && envObj.valueFrom.configMapKeyRef && envObj.valueFrom.configMapKeyRef.name === imObj.name)
          )) ||
          objData.info.data.spec.volumes && objData.info.data.spec.volumes.some(volumeObj => volumeObj.configMap && volumeObj.configMap.name === imObj.name)
        );
    });

    return childObjects.map(obj => obj.info.uuid);
  }

  /**
   * Gets adjacent Pods from a PersistentVolumeClaim/Endpoint/ConfigMap node
   */
  private getAdjacentPods(objData: DataObject): string[] {
    if (objData.type === 'PersistentVolumeClaim') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Pod' &&
          imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace &&
          imObj.info.data.spec.volumes &&
          imObj.info.data.spec.volumes.some(volumeObj => volumeObj.persistentVolumeClaim && volumeObj.persistentVolumeClaim.claimName === objData.name);
      });

      return childObjects.map(obj => obj.info.uuid);
    }

    if (objData.type === 'Endpoints') {
      if (!objData.info.data.subsets) return [];

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Pod' &&
          objData.info.data.subsets.some(objSubset => {
            return (objSubset.addresses ? objSubset.addresses.some((subsetAddress) =>
              subsetAddress.targetRef &&
              subsetAddress.targetRef.kind === imObj.type &&
              subsetAddress.targetRef.name === imObj.name &&
              subsetAddress.targetRef.namespace === imObj.info.data.metadata.namespace
              ) : false) ||
              (objSubset.notReadyAddresses ? objSubset.notReadyAddresses.some((subsetAddress) =>
                subsetAddress.targetRef &&
                subsetAddress.targetRef.kind === imObj.type &&
                subsetAddress.targetRef.name === imObj.name &&
                subsetAddress.targetRef.namespace === imObj.info.data.metadata.namespace
              ) : false);
          });
      });

      return childObjects.map(obj => obj.info.uuid);
    }

    if (objData.type === 'ConfigMap') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Pod' &&
          imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace &&
          (
            imObj.info.data.spec.containers.some(containerObj => (
              containerObj.envFrom && containerObj.envFrom.some(envFromObj => envFromObj.configMapRef && envFromObj.configMapRef.name === objData.name) ||
              containerObj.env && containerObj.env.some(envObj => envObj.valueFrom && envObj.valueFrom.configMapKeyRef && envObj.valueFrom.configMapKeyRef.name === objData.name)
            )) ||
            imObj.info.data.spec.volumes && imObj.info.data.spec.volumes.some(volumeObj => volumeObj.configMap && volumeObj.configMap.name === objData.name)
          );
      });

      return childObjects.map(obj => obj.info.uuid);
    }
  }

  /**
   * Gets adjacent Endpoints from a Service/Pod node
   */
  private getAdjacentEndpoints(objData: DataObject): string[] {

    if (objData.type === 'Service') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Endpoints' &&
          imObj.name === objData.name;
      });

      return childObjects.map(obj => obj.info.uuid);
    }

    if (objData.type === 'Pod') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Endpoints' &&
          imObj.info.data.subsets &&
          imObj.info.data.subsets.some(objSubset => {
            return (objSubset.addresses ? objSubset.addresses.some((subsetAddress) =>
              subsetAddress.targetRef &&
              subsetAddress.targetRef.kind === objData.type &&
              subsetAddress.targetRef.name === objData.name &&
              subsetAddress.targetRef.namespace === objData.info.data.metadata.namespace
              ) : false) ||
              (objSubset.notReadyAddresses ? objSubset.notReadyAddresses.some((subsetAddress) =>
                subsetAddress.targetRef &&
                subsetAddress.targetRef.kind === objData.type &&
                subsetAddress.targetRef.name === objData.name &&
                subsetAddress.targetRef.namespace === objData.info.data.metadata.namespace
              ) : false);
          });
      });

      return childObjects.map(obj => obj.info.uuid);
    }

  }

  /**
   * Gets adjacent Services from an Ingress/Endpoint node
   */
  private getAdjacentServices(objData: DataObject): string[] {

    if (objData.type === 'Ingress') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Service' &&
          imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace &&
          (
            objData.info.data.spec.backend ? objData.info.data.spec.backend.serviceName === imObj.name :
              objData.info.data.spec.rules ? objData.info.data.spec.rules.some(objRule => {
                return objRule.http.paths.some((rulePath) => rulePath.backend.serviceName === imObj.name);
              }) : false
          );
      });

      return childObjects.map(obj => obj.info.uuid);
    }

    if (objData.type === 'Endpoints') {

      const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === 'Service' &&
          imObj.name === objData.name;
      });

      return childObjects.map(obj => obj.info.uuid);
    }

  }

  /**
   * Gets adjacent Ingresses from a Service node
   */
  private getAdjacentIngresses(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
      return imObj.type === 'Ingress' &&
        imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace &&
        (
          imObj.info.data.spec.backend ? imObj.info.data.spec.backend.serviceName === objData.name :
            imObj.info.data.spec.rules ? imObj.info.data.spec.rules.some(objRule => {
              return objRule.http.paths.some((rulePath) => rulePath.backend.serviceName === objData.name);
            }) : false
        );
    });

    return childObjects.map(obj => obj.info.uuid);
  }

  /**
   * Gets adjacent PVCs from a Pod/PersistentVolume node
   */
  private getAdjacentPersistentVolumeClaims(objData: DataObject): string[] {

    if (objData.type === 'PersistentVolume') {
      if (objData.info.data.status.phase !== 'Bound') return [];

      return [`${objData.info.mainUuid}#kubernetes;\u003c${objData.info.data.spec.claimRef.uid}:${objData.info.data.spec.claimRef.kind}\u003e`];
    }

    if (objData.type === 'Pod') {
      if (!objData.info.data.spec.volumes) return [];

      const objects: string[] =objData.info.data.spec.volumes.map(objVolume => {
        if (!objVolume.persistentVolumeClaim) return null;

        const foundPVCs: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
          return imObj.type === 'PersistentVolumeClaim' &&
            imObj.name === objVolume.persistentVolumeClaim.claimName &&
            imObj.info.data.metadata.namespace === objData.info.data.metadata.namespace;
        });

        if (foundPVCs.length !== 0) return foundPVCs[0].info.uuid;
        return null;

      });

      return objects.filter(o => o);
    }
  }

  /**
   * Gets adjacent PersistentVolume from a PersistentVolumeClaim node
   */
  private getAdjacentPersistentVolumes(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
      return imObj.type === 'PersistentVolume' &&
        imObj.info.data.spec.claimRef &&
        imObj.info.data.spec.claimRef.kind === 'PersistentVolumeClaim' &&
        imObj.info.data.spec.claimRef.name === objData.name &&
        imObj.info.data.spec.claimRef.namespace === objData.info.data.metadata.namespace &&
        // Doublecheck
        objData.info.data.spec.volumeName === imObj.name;
    });

    return childObjects.map(obj => obj.info.uuid);

  }

  /**
   * Gets adjacent ServiceAccounts/Users/Groups from a RoleBinding/ClusterRoleBinding node
   */
  private getAdjacentRoleSubjects(objData: DataObject): string[] {
    if (!objData.info.data.subjects) return [];

    const objects: string[] = objData.info.data.subjects.map(subjectObj => {

      const foundSubjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
        return imObj.type === subjectObj.kind &&
          imObj.name === subjectObj.name &&
          (subjectObj.namespace ? imObj.info.data.metadata.namespace === subjectObj.namespace : true);
      });

      if (foundSubjects.length !== 0) return foundSubjects[0].info.uuid;
      return null;

    });

    return objects.filter(o => o);
  }

  /**
   * Gets adjacent RoleBinding/ClusterRoleBinding from a ServiceAccounts/Users/Groups node
   */
  private getAdjacentRoleBindingsFromSubjects(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
      return (imObj.type === 'RoleBinding' || imObj.type === 'ClusterRoleBinding') &&
        imObj.info.data.subjects &&
        imObj.info.data.subjects.some(subObj => {
          return subObj.kind === objData.type &&
            subObj.name === objData.name &&
            (objData.info.data.metadata.namespace ? subObj.namespace === objData.info.data.metadata.namespace : true);
        });
    });

    return childObjects.map(obj => obj.info.uuid);

  }

  /**
   * Gets adjacent RoleBinding/ClusterRoleBinding from a Role node
   */
  private getAdjacentRoleBindingsFromRole(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes',(imObj) => {
      return (imObj.type === 'RoleBinding' || imObj.type === 'ClusterRoleBinding') &&
        imObj.info.data.roleRef &&
        imObj.info.data.roleRef.kind === objData.type &&
        imObj.info.data.roleRef.name === objData.name;
    });

    return childObjects.map(obj => obj.info.uuid);

  }

  /**
   * Gets adjacent Role from a RoleBinding/ClusterRoleBinding node
   */
  private getAdjacentRole(objData: DataObject): string[] {

    const childObjects: DataObject[] = this.LibNodeHelpers.getObjectByCustomFilter(objData.info.mainUuid, 'kubernetes', (imObj) => {
      return imObj.type === objData.info.data.roleRef.kind &&
        imObj.name === objData.info.data.roleRef.name;
    });

    return childObjects.map(obj => obj.info.uuid);

  }

  /**
   * Node data
   * ---------
   */

  private getNodeMetrics(objData: DataObject): ImGraphNodeMetric[] {
    const metrics = [];

    if (objData.type === 'VirtualMachine') {
      metrics.push({
          id: 'cpu_total_usage',
          label: 'CPU',
          format: 'percent',
          value: (objData.info.data['summary.quickStats.overallCpuUsage'] ? (objData.info.data['summary.quickStats.overallCpuUsage'] * 100) / objData.info.data['summary.runtime.maxCpuUsage'] : 0),
          priority: 1,
          samples: null,
          min: 0,
          max: 100,
          url: 0
        },
        {
          id: 'memory_usage',
          label: 'Memory',
          format: 'filesize',
          value: objData.info.data['summary.quickStats.guestMemoryUsage'] * 1024 * 1024,
          priority: 2,
          samples: null,
          min: 0,
          max: objData.info.data['summary.config.memorySizeMB'] * 1024 * 1024,
          url: 0
        });
    }

    if (objData.type === 'ClusterComputeResource') {
      metrics.push({
          id: 'cpu_total_usage',
          label: 'CPU',
          format: 'percent',
          value: (objData.info.data.summary[0].usageSummary[0].totalCpuCapacityMhz === 0 ? 0 :
              (objData.info.data.summary[0].usageSummary[0].cpuDemandMhz * 100) / objData.info.data.summary[0].usageSummary[0].totalCpuCapacityMhz
          ),
          priority: 1,
          samples: null,
          min: 0,
          max: 100,
          url: 0
        },
        {
          id: 'memory_usage',
          label: 'Memory',
          format: 'filesize',
          value: objData.info.data.summary[0].usageSummary[0].memDemandMB * 1024 * 1024,
          priority: 2,
          samples: null,
          min: 0,
          max: objData.info.data.summary[0].usageSummary[0].totalMemCapacityMB * 1024 * 1024,
          url: 0
        });

      return metrics;
    }

    if (objData.type === 'Datastore' || objData.type === 'StoragePod') {
      metrics.push({
        id: 'disk_total_usage',
        label: 'Disk',
        format: 'filesize',
        value: objData.info.data['summary.capacity'] - objData.info.data['summary.freeSpace'],
        priority: 1,
        samples: null,
        min: 0,
        max: objData.info.data['summary.capacity'],
        url: 0
      });
    }
  }

  private getNodeMetadata(objData: DataObject): NodeGraphNodeMetadata[] {
    return [
      {
        id: 'node_type',
        label: 'Type',
        value: objData.type,
        priority: 1
      }
    ];
  }

  private isTypeStacked(type: string): boolean {
    return [
      'vmware',
      'storage',
      // VMWARE
      'Datacenter',
      'ClusterComputeResource',
      'StoragePod',
      'VirtualApp',
      // KUBERNETES
      'Namespace',
      'Node',
      'DaemonSet',
      'StatefulSet',
      'Deployment',
      'ReplicaSet',
      'CronJob'
    ].includes(type);
  }

  private getShapeByType(type: string): string {
    return (
      type === 'vmware' || type === 'netapp' ? 'octagon' :
        // VMWARE
        type === 'Datacenter' || type === 'vserver' ? 'heptagon' :
          type === 'ClusterComputeResource' || type === 'HostSystem' ? 'hexagon' :
            type === 'Folder' ? 'sheet' :
              type === 'VirtualApp' || type === 'VirtualMachine' ? 'circle' :
                type === 'StoragePod' || type === 'Datastore' || type === 'volume' ? 'cylinder' :
                  type === 'VirtualDisk' || type === 'snapshot' ? 'dottedcylinder' :
                    type === 'VmwareDistributedVirtualSwitch' || type === 'DistributedVirtualPortgroup' ? 'triangle' :
                      type === 'Network' ? 'network' :
                        type === 'VirtualVmxnet3' ? 'dottedtriangle' :
                          type === 'ResourcePool' ? 'pentagon' :
                            // KUBERNETES
                            type === 'Namespace' ? 'octagon' :
                              type === 'Node' ? 'octagon' :
                                type === 'DaemonSet' ? 'heptagon' :
                                  type === 'StatefulSet' ? 'heptagon' :
                                    type === 'Deployment' ? 'heptagon' :
                                      type === 'ReplicaSet' ? 'heptagon' :
                                        type === 'CronJob' ? 'triangle' :
                                          type === 'Job' ? 'dottedtriangle' :
                                            type === 'Pod' ? 'hexagon' :
                                              type === 'Endpoints' ? 'pentagon' :
                                                type === 'Service' ? 'pentagon' :
                                                  type === 'Ingress' ? 'pentagon' :
                                                    type === 'ConfigMap' ? 'square' :
                                                      type === 'PersistentVolumeClaim' ? 'dottedcylinder' :
                                                        type === 'PersistentVolume' ? 'cylinder' :
                                                          'dottedcylinder'
    );
  }

  private getNodeAdjacents(objData: DataObject): string[] {
    let adjacent = [];

    // Get Parents
    if (['Pod', 'ReplicaSet', 'Job'].includes(objData.type)) {
      const adjacentParent: string | void = this.getAdjacentParent(objData);
      if (adjacentParent) adjacent.push(adjacentParent);
    }

    // Get Child
    if (['DaemonSet', 'StatefulSet', 'ReplicaSet', 'Deployment', 'CronJob', 'Job', 'Namespace', 'Folder'].includes(objData.type)) {
      adjacent = [...adjacent, ...this.getAdjacentChildrens(objData)];
    }

    // VMWare
    if (objData.type === 'HostSystem') {
      adjacent = [...adjacent, ...this.getAdjacentVMs(objData)];
      adjacent = [...adjacent, ...this.getAdjacentStoragePods(objData)];
      adjacent = [...adjacent, ...this.getAdjacentDatastores(objData)];
    }

    if (objData.type === 'VirtualMachine') {
      adjacent = [...adjacent, ...this.getAdjacentDisks(objData)];
      adjacent = [...adjacent, ...this.getAdjacentNetworks(objData)];
    }

    if (objData.type === 'StoragePod') {
      adjacent = [...adjacent, ...this.getAdjacentDatastores(objData)];
    }

    if (objData.type === 'Datastore') {

      // Do not go further when mainNode is a VirtualMachine, otherwise this will get all VMs from this Datastore and so one
      if (this.mainNode && this.mainNode.type === 'VirtualMachine') return adjacent;

      adjacent = [...adjacent, ...this.getAdjacentVMs(objData)];
    }

    // Kubernetes
    if (objData.type === 'ConfigMap') {
      adjacent = [...adjacent, ...this.getAdjacentPods(objData)];
    }

    if (objData.type === 'Pod') {
      adjacent = [...adjacent, ...this.getAdjacentPersistentVolumeClaims(objData)];
      adjacent = [...adjacent, ...this.getAdjacentConfigMaps(objData)];
      adjacent = [...adjacent, ...this.getAdjacentEndpoints(objData)];
    }

    if (objData.type === 'Endpoints') {
      adjacent = [...adjacent, ...this.getAdjacentPods(objData)];
      adjacent = [...adjacent, ...this.getAdjacentServices(objData)];
    }

    if (objData.type === 'Service') {
      adjacent = [...adjacent, ...this.getAdjacentEndpoints(objData)];
      adjacent = [...adjacent, ...this.getAdjacentIngresses(objData)];
    }

    if (objData.type === 'Ingress') {
      adjacent = [...adjacent, ...this.getAdjacentServices(objData)];
    }

    if (objData.type === 'PersistentVolumeClaim') {
      adjacent = [...adjacent, ...this.getAdjacentPods(objData)];
      adjacent = [...adjacent, ...this.getAdjacentPersistentVolumes(objData)];
    }

    if (objData.type === 'PersistentVolume') {
      adjacent = [...adjacent, ...this.getAdjacentPersistentVolumeClaims(objData)];
    }

    if (objData.type === 'Role' || objData.type === 'ClusterRole') {
      adjacent = [...adjacent, ...this.getAdjacentRoleBindingsFromRole(objData)];
    }

    if (objData.type === 'RoleBinding' || objData.type === 'ClusterRoleBinding') {
      adjacent = [...adjacent, ...this.getAdjacentRoleSubjects(objData)];
      adjacent = [...adjacent, ...this.getAdjacentRole(objData)];
    }

    if (objData.type === 'ServiceAccount' || objData.type === 'Group' || objData.type === 'User') {
      adjacent = [...adjacent, ...this.getAdjacentRoleBindingsFromSubjects(objData)];
    }

    return adjacent;
  }

  /**
   * Node init
   * ---------
   */
  private setNode(objData: DataObject): void {
    if (this.nodes.some(n => n.id === objData.info.uuid)) return;

    const nodeAdjacent: string[] = this.getNodeAdjacents(objData);

    // Set Basic node data
    this.nodes.push({
      id: objData.info.uuid,
      nodeInfo: objData,
      label: objData.name,
      labelMinor: objData.type,
      rank: objData.type + '/' + objData.info.obj.name,
      shape: this.getShapeByType(objData.type),
      stack: this.isTypeStacked(objData.type),
      metadata: this.getNodeMetadata(objData),
      metrics: this.getNodeMetrics(objData),
      adjacency: nodeAdjacent
    });

    // Set each adjacent node to nodes object
    this.setAdjacentNodes(objData);

    return;
  }

  async setNodeGraphNodes(graphType: string = 'all', objData?: DataObject): Promise<ImGraphNode[]> {
    this.graphType = graphType;
    this.nodes = [];

    // Return object
    if (objData) {
      this.mainNode = objData;
      this.setNode(objData);
      return this.nodes;
    }

    if (this.graphType === 'all') {
      const kubernetesPods: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'kubernetes', 'Pod');
      for (const podObj of kubernetesPods) {
        this.setNode(podObj);
      }

      const vmwareVMs: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'VirtualMachine');
      for (const vmObj of vmwareVMs) {
        this.setNode(vmObj);
      }

      const netappVolumes: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'netapp', 'volume');
      for (const volObj of netappVolumes) {
        this.setNode(volObj);
      }

      const vmwareHosts: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'Host');
      for (const hostObj of vmwareHosts) {
        this.setNode(hostObj);
      }

      const vmwareHostSystems: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'HostSystem');
      for (const hostSystemObj of vmwareHostSystems) {
        this.setNode(hostSystemObj);
      }
    }

    // Return all object by topology type
    if (this.graphType === 'pods') {
      const kubernetesPods: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'kubernetes', 'Pod');
      kubernetesPods.map((podObj: DataObject) => this.setNode(podObj));
    }

    if (this.graphType === 'virtualmachines') {
      const vmwareVMs: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'VirtualMachine');
      vmwareVMs.map((vmObj: DataObject) => this.setNode(vmObj));
    }

    if (this.graphType === 'volumes') {
      const netappVolumes: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'netapp', 'volume');
      netappVolumes.map((volObj: DataObject) => this.setNode(volObj));
    }

    if (this.graphType === 'hosts') {
      const vmwareHosts: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'Host');
      vmwareHosts.map((hostObj: DataObject) => this.setNode(hostObj));

      const vmwareHostSystems: DataObject[] = this.LibNodeHelpers.getObjectsByType(null, 'vmware', 'HostSystem');
      vmwareHostSystems.map((hostSystemObj: DataObject) => this.setNode(hostSystemObj));
    }

    if (this.graphType === 'processes') {

    }

    console.log(this.nodes);

    return this.nodes;
  }

  selectedNodeChange($event) {
    console.log($event);
  }

  async getTopologies() {
    const topologies = [
      {
        hide_if_empty: false,
        name: 'All',
        rank: 0,
        stats: {
          edge_count: 1,
          filtered_nodes: 2,
          node_count: 3,
          nonpseudo_node_count: 4
        },
        options: [
          {
            defaultValue: 'all',
            id: 'all',
            options: [
              {
                label: 'All',
                value: 'all'
              },
              {
                label: 'Virtual Nodes',
                value: 'virtual'
              },
              {
                label: 'Container Nodes',
                value: 'container'
              },
              {
                label: 'Standalone Nodes',
                value: 'standalone'
              },
              {
                label: 'Storage Nodes',
                value: 'storage'
              }
            ]
          }
        ]
      },

      {
        hide_if_empty: false,
        name: 'VirtualMachines',
        options: [
          {
            defaultValue: 'hide',
            id: 'backups',
            options: [
              {
                label: 'Show backups',
                value: 'show'
              },
              {
                label: 'Hide backups',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'show',
            id: 'storage',
            options: [
              {
                label: 'Show storage',
                value: 'show'
              },
              {
                label: 'Hide storage',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: '',
            id: 'connection',
            noneLabel: 'All Connections',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'inaregames-com',
                value: 'inaregames-com'
              },
              {
                label: 'isartnavarro-io',
                value: 'isartnavarro-io'
              },
              {
                label: 'kube-public',
                value: 'kube-public'
              },
              {
                label: 'kube-system',
                value: 'kube-system'
              },
              {
                label: 'monitoring',
                value: 'monitoring'
              },
              {
                label: 'weave',
                value: 'weave'
              },
              {
                label: 'wiki',
                value: 'wiki'
              }
            ],
            selectType: 'union'
          }
        ],
        rank: 1,
        stats: {
          edge_count: 1,
          filtered_nodes: 2,
          node_count: 3,
          nonpseudo_node_count: 4
        }
      },

      {
        hide_if_empty: false,
        name: 'Pods',
        options: [
          {
            defaultValue: 'hide',
            id: 'snapshot',
            options: [
              {
                label: 'Show snapshots',
                value: 'show'
              },
              {
                label: 'Hide snapshots',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'show',
            id: 'storage',
            options: [
              {
                label: 'Show storage',
                value: 'show'
              },
              {
                label: 'Hide storage',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'hide',
            id: 'pseudo',
            options: [
              {
                label: 'Show unmanaged',
                value: 'show'
              },
              {
                label: 'Hide unmanaged',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: '',
            id: 'namespace',
            noneLabel: 'All Namespaces',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'inaregames-com',
                value: 'inaregames-com'
              },
              {
                label: 'isartnavarro-io',
                value: 'isartnavarro-io'
              },
              {
                label: 'kube-public',
                value: 'kube-public'
              },
              {
                label: 'kube-system',
                value: 'kube-system'
              },
              {
                label: 'monitoring',
                value: 'monitoring'
              },
              {
                label: 'weave',
                value: 'weave'
              },
              {
                label: 'wiki',
                value: 'wiki'
              }
            ],
            selectType: 'union'
          }
        ],
        rank: 2,
        stats: {
          edge_count: 13,
          filtered_nodes: 16,
          node_count: 36,
          nonpseudo_node_count: 35
        },
        sub_topologies: [
          {
            hide_if_empty: true,
            name: 'Controllers',
            options: [
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show unmanaged',
                    value: 'show'
                  },
                  {
                    label: 'Hide unmanaged',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 11,
              filtered_nodes: 4,
              node_count: 26,
              nonpseudo_node_count: 25
            },
            url: '/api/topology/kube-controllers'
          },
          {
            hide_if_empty: true,
            name: 'Services',
            options: [
              {
                defaultValue: 'hide',
                id: 'pseudo',
                options: [
                  {
                    label: 'Show unmanaged',
                    value: 'show'
                  },
                  {
                    label: 'Hide unmanaged',
                    value: 'hide'
                  }
                ]
              },
              {
                defaultValue: '',
                id: 'namespace',
                noneLabel: 'All Namespaces',
                options: [
                  {
                    label: 'default',
                    value: 'default'
                  },
                  {
                    label: 'inaregames-com',
                    value: 'inaregames-com'
                  },
                  {
                    label: 'isartnavarro-io',
                    value: 'isartnavarro-io'
                  },
                  {
                    label: 'kube-public',
                    value: 'kube-public'
                  },
                  {
                    label: 'kube-system',
                    value: 'kube-system'
                  },
                  {
                    label: 'monitoring',
                    value: 'monitoring'
                  },
                  {
                    label: 'weave',
                    value: 'weave'
                  },
                  {
                    label: 'wiki',
                    value: 'wiki'
                  }
                ],
                selectType: 'union'
              }
            ],
            rank: 0,
            stats: {
              edge_count: 7,
              filtered_nodes: 4,
              node_count: 15,
              nonpseudo_node_count: 15
            },
            url: '/api/topology/services'
          }
        ],
      },

      {
        hide_if_empty: false,
        name: 'Volumes',
        options: [
          {
            defaultValue: 'hide',
            id: 'backups',
            options: [
              {
                label: 'Show backups',
                value: 'show'
              },
              {
                label: 'Hide backups',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: 'show',
            id: 'links',
            options: [
              {
                label: 'Show links',
                value: 'show'
              },
              {
                label: 'Hide links',
                value: 'hide'
              }
            ]
          },
          {
            defaultValue: '',
            id: 'connection',
            noneLabel: 'All Connections',
            options: [
              {
                label: 'default',
                value: 'default'
              },
              {
                label: 'inaregames-com',
                value: 'inaregames-com'
              },
              {
                label: 'isartnavarro-io',
                value: 'isartnavarro-io'
              },
              {
                label: 'kube-public',
                value: 'kube-public'
              },
              {
                label: 'kube-system',
                value: 'kube-system'
              },
              {
                label: 'monitoring',
                value: 'monitoring'
              },
              {
                label: 'weave',
                value: 'weave'
              },
              {
                label: 'wiki',
                value: 'wiki'
              }
            ],
            selectType: 'union'
          }
        ],
        rank: 3,
        stats: {
          edge_count: 13,
          filtered_nodes: 16,
          node_count: 36,
          nonpseudo_node_count: 35
        },
      },

      {
        hide_if_empty: false,
        name: 'Hosts',
        options: [
          {
            defaultValue: 'all',
            id: 'all',
            options: [
              {
                label: 'All',
                value: 'all'
              },
              {
                label: 'Virtual Nodes',
                value: 'virtual'
              },
              {
                label: 'Container Nodes',
                value: 'container'
              },
              {
                label: 'Standalone Nodes',
                value: 'standalone'
              },
              {
                label: 'Storage Nodes',
                value: 'storage'
              }
            ]
          }
        ],
        rank: 4,
        stats: {
          edge_count: 5,
          filtered_nodes: 1,
          node_count: 3,
          nonpseudo_node_count: 2
        }

      },

      {
        hide_if_empty: true,
        name: 'Processes',
        options: [
          {
            defaultValue: 'hide',
            id: 'unconnected',
            options: [
              {
                label: 'Show unconnected',
                value: 'show'
              },
              {
                label: 'Hide unconnected',
                value: 'hide'
              }
            ]
          }
        ],
        rank: 5,
        stats: {
          edge_count: 8,
          filtered_nodes: 331,
          node_count: 11,
          nonpseudo_node_count: 10
        },
        sub_topologies: [
          {
            hide_if_empty: true,
            name: 'by name',
            options: [
              {
                defaultValue: 'hide',
                id: 'unconnected',
                options: [
                  {
                    label: 'Show unconnected',
                    value: 'show'
                  },
                  {
                    label: 'Hide unconnected',
                    value: 'hide'
                  }
                ]
              }
            ],
            rank: 0,
            stats: {
              edge_count: 4,
              filtered_nodes: 123,
              node_count: 5,
              nonpseudo_node_count: 4
            },
            url: '/api/topology/processes-by-name'
          }
        ],
      },
    ];

    return topologies;
  }

}
