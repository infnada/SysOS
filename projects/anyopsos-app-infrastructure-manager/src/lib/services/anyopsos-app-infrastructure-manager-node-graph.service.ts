import {Injectable} from '@angular/core';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';

import {ImDataObject} from '../types/im-data-object';
import {ImTreeNode} from '../types/im-tree-node';
import {ConnectionTypes} from '../types/connections/connection-types';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerNodeGraphService {

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  private isTypeStacked(type: string): boolean {
    return ['vmware', 'storage', 'Datacenter', 'ClusterComputeResource', 'StoragePod', 'VirtualApp'].includes(type);
  }

  private getShapeByType(type: string): string {
    return (
      type === 'vmware' || type === 'netapp' ? 'octagon' :
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
                            'dottedcylinder'
    );
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
   * Gets adjacent Parents from a node
   */
  private getAdjacentParent(objData): string {

    // Is main object. Connect to pseudo
    if (!objData.info) {
      return `pseudo:${(objData.type === 'vmware' ? 'virtual' : objData.type === 'netapp' ? 'storage' : objData.type === 'kubernetes' ? 'container' : '')}:`;

      // Have parent connect to it
    } else if (objData.info.parent) {
      return `${objData.info.mainUuid};\u003c${objData.info.parent.name}:${objData.info.parent.type}\u003e`;

      // Don't have parent, connect to main object
    } else {
      return objData.info.mainUuid;
    }
  }

  /**
   * Gets adjacent Childrens from a node
   */
  private getAdjacentChildrens(objData, connectionNodes): string[] {
    const adjacentChildrens = [];

    if (!objData.info) return adjacentChildrens;

    const childrens = connectionNodes.filter(obj => (obj.info && obj.info.parent && (obj.info.parent.type === objData.info.obj.type && obj.info.parent.name === objData.info.obj.name)));

    childrens.forEach((child) => {
      adjacentChildrens.push(`${child.info.mainUuid};\u003c${child.info.obj.name}:${child.info.obj.type}\u003e`);
    });

    return adjacentChildrens;
  }

  /**
   * Gets adjacent Datastores from a node
   */
  private getAdjacentDatastores(objData): string[] {
    const adjacentDatastores = [];

    if (objData.type === 'VirtualMachine' && objData.info.data.datastore[0].ManagedObjectReference) {
      // Connect to Datastores
      if (Array.isArray(objData.info.data.datastore[0].ManagedObjectReference)) {
        Array.isArray(objData.info.data.datastore[0].ManagedObjectReference.forEach((datastoreData) => {
          adjacentDatastores.push(`${objData.info.mainUuid};\u003c${datastoreData.name}:${datastoreData.type}\u003e`);
        }));
      } else {
        adjacentDatastores.push(`${objData.info.mainUuid};\u003c${objData.info.data.datastore[0].ManagedObjectReference.name}:${objData.info.data.datastore[0].ManagedObjectReference.type}\u003e`);
      }

      return adjacentDatastores;
    }

    return adjacentDatastores;
  }

  /**
   * Gets adjacent VMs from a node
   */
  private getAdjacentVMs(objData): string[] {
    const adjacentVMs = [];

    if (objData.info.data.vm && objData.info.data.vm[0].ManagedObjectReference) {
      // Connect to VMs
      if (Array.isArray(objData.info.data.vm[0].ManagedObjectReference)) {
        Array.isArray(objData.info.data.vm[0].ManagedObjectReference.forEach((vmData) => {
          adjacentVMs.push(`${objData.info.mainUuid};\u003c${vmData.name}:${vmData.type}\u003e`);
        }));
      } else {
        adjacentVMs.push(`${objData.info.mainUuid};\u003c${objData.info.data.vm[0].ManagedObjectReference.name}:${objData.info.data.vm[0].ManagedObjectReference.type}\u003e`);
      }

      return adjacentVMs;
    }

    return adjacentVMs;
  }

  /**
   * Special use/case
   * Since VM Disks are not connection objects, we inspect directly the VM to get the disks information.
   * Gets and returns nodes and adjacent Disks from VM object
   */
  private getAdjacentDisks(nodes, objData): { nodes: { nodes: { [key: string]: ImTreeNode } }; adjacentDisks: string[]} {
    const adjacentDisks = [];

    if (objData.type === 'VirtualMachine' && objData.info.data['config.hardware.device'][0].VirtualDevice) {

      objData.info.data['config.hardware.device'][0].VirtualDevice.forEach((device) => {

        if (device.xsi_type === 'VirtualDisk') {
          const diskId = `${objData.info.mainUuid};\u003c${device.backing[0].uuid}:${device.xsi_type}\u003e`;
          const datastoreId = `${objData.info.mainUuid};\u003c${device.backing[0].datastore.name}:${device.backing[0].datastore.type}\u003e`;

          // Calculate disk usage
          const diskChain = objData.info.data.layoutEx[0].disk.find((disk) => {
            return disk.key === device.key;
          }).chain[0].fileKey;

          const diskUsage = objData.info.data.layoutEx[0].file.filter(file => diskChain.includes(file.key)).reduce((sum, { size }: { size: string } ) => {
            return sum + parseInt(size, 10);
          }, 0);

          adjacentDisks.push(diskId);

          // Set special VirtualDisk node
          nodes.nodes[diskId] = {
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
                url: 0
              }
            ],
            adjacency: [
              // Datastore
              datastoreId
            ]
          };

          // Set Datastore node
          const currentAdjacentNode = this.InfrastructureManager.getConnectionByUuid(objData.info.mainUuid).data.Data.find(obj => obj.info.uuid === datastoreId);

          nodes = this.setNode(nodes, currentAdjacentNode);
        }

      });

    }

    return {
      adjacentDisks,
      nodes
    };
  }

  /**
   * Special use/case
   * Since VM Networks are not connection objects, we inspect directly the VM to get the networks information.
   * Gets and returns nodes and adjacent Networks from VM object
   */
  private getAdjacentNetworks(nodes, objData): { nodes: { nodes: { [key: string]: ImTreeNode } }; adjacentNetworks: string[]} {
    const adjacentNetworks = [];

    if (objData.type === 'VirtualMachine' && objData.info.data['config.hardware.device'][0].VirtualDevice) {

      objData.info.data['config.hardware.device'][0].VirtualDevice.forEach((device) => {

        if (device.xsi_type === 'VirtualVmxnet3' || device.xsi_type === 'VirtualE1000e') {
          const nicId = `${objData.info.mainUuid};\u003c${device.macAddress}:${device.xsi_type}\u003e`;
          const networkId = `${objData.info.mainUuid};\u003c${device.backing[0].network.name}:${device.backing[0].network.type}\u003e`;

          adjacentNetworks.push(nicId);

          // Set special VirtualDisk node
          nodes.nodes[nicId] = {
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
              // Datastore
              networkId
            ]
          };

          // Set Datastore node
          const currentAdjacentNode = this.InfrastructureManager.getConnectionByUuid(objData.info.mainUuid).data.Data.find(obj => obj.info.uuid === networkId);

          nodes = this.setNode(nodes, currentAdjacentNode);
        }

      });

    }

    return {
      adjacentNetworks,
      nodes
    };
  }

  /**
   * For each adjacent nodeId, get->set the node
   */
  private getAdjacentNodes(nodes, nodeId, connectionNodes): { nodes: { [key: string]: ImTreeNode } } {
    nodes.nodes[nodeId].adjacency.forEach((adjacentUuid) => {
      const currentAdjacentNode = connectionNodes.find(obj => (obj.info && obj.info.uuid) === adjacentUuid);

      if (currentAdjacentNode) nodes = this.setNode(nodes, currentAdjacentNode);
    });

    return nodes;
  }

  private setNode(nodes, objData, detailed: boolean = false): { nodes: { [key: string]: ImTreeNode } } {
    const nodeId: string = (objData.info ? objData.info.uuid : objData.uuid);

    // Invalid node type
    if (!nodeId) return nodes;

    /**
     * Metrics
     */
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

    /**
     * Set basic node info
     */
    nodes.nodes[nodeId] = {
      id: nodeId,
      nodeInfo: objData,
      label: (objData.name ? objData.name : objData.host ? objData.host : objData.clusterName ? objData.clusterName : 'na'),
      labelMinor: (objData.description ? objData.description : objData.type),
      rank: objData.type + '/' + (objData.info ? objData.info.obj.name : objData.host),
      shape: this.getShapeByType(objData.type),
      stack: this.isTypeStacked(objData.type),
      metadata: [
        {
          id: 'node_type',
          label: 'Type',
          value: objData.type,
          priority: 1
        }
      ],
      metrics,
      adjacency: [
        // Parent
        this.getAdjacentParent(objData),

        // HostSystem
        (objData.type === 'VirtualMachine' ? `${objData.info.mainUuid};\u003c${objData.info.data['runtime.host'].name}:${objData.info.data['runtime.host'].type}\u003e` : ''),
      ]
    };

    /**
     * ----------------------------
     */

    if (!detailed) {
      // Datastores adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentDatastores(objData));
    }

    /**
     * ----------------------------
     */
    if (detailed && objData.info) {
      const connectionNodes = this.InfrastructureManager.getConnectionByUuid(objData.info.mainUuid).data.Data;

      // VMs adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentVMs(objData));

      // Children adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentChildrens(objData, connectionNodes));

      // Set each adjacent node to nodes object
      nodes = this.getAdjacentNodes(nodes, nodeId, connectionNodes);

      // VM Disks adjacent and nodes
      const vmDisks = this.getAdjacentDisks(nodes, objData);

      nodes = vmDisks.nodes;
      nodes.nodes[nodeId].adjacency.push(...vmDisks.adjacentDisks);

      // VM Networks adjacent and nodes
      const vmNetworks = this.getAdjacentNetworks(nodes, objData);

      nodes = vmNetworks.nodes;
      nodes.nodes[nodeId].adjacency.push(...vmNetworks.adjacentNetworks);
    }

    return nodes;
  }

  setNodeGraphNodes(): { nodes: { [key: string]: ImTreeNode } } {
    let nodes: { nodes: { [key: string]: ImTreeNode } } = {
      nodes: {}
    };

    const activeObject = this.InfrastructureManager.getActiveObject();

    // Return everything if no activeConnection. Set pseudo elements
    if (!activeObject)  {
      nodes = this.setPseudoNodes(nodes);

      this.InfrastructureManager.getConnections().forEach((connection: ConnectionTypes) => {
        nodes = this.setNode(nodes, connection);

        // Get all object children
        if (!connection.data || !connection.data.Data) return;

        connection.data.Data.forEach((objData: ImDataObject) => {
          nodes = this.setNode(nodes, objData);
        });
      });
    }

    if (activeObject)  {
      nodes = this.setNode(nodes, activeObject, true);
    }

    return nodes;
  }

  selectedNodeChange($event) {
    console.log($event);
  }

}
