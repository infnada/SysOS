import {Injectable} from '@angular/core';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';

import {ImConnection} from '../types/im-connection';
import {ImDataObject} from '../types/im-data-object';
import {ImTreeNode} from '../types/im-tree-node';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerNodeGraphService {

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
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

    return nodes;
  }

  /**
   * Gets adjacent Parents from a node
   */
  private getAdjacentParent(objData): string {

    // Is main object. Connect to pseudo
    if (!objData.info) {
      return `pseudo:${(objData.type === 'vmware' ? 'virtual' : '')}:`;

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
  private getAdjacentChildrens(nodeId, objData, connectionNodes): string[] {
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

    if (objData.type === 'VirtualMachine' && objData.info.data.datastore.ManagedObjectReference) {
      // Connect to Datastores
      if (Array.isArray(objData.info.data.datastore.ManagedObjectReference)) {
        Array.isArray(objData.info.data.datastore.ManagedObjectReference.forEach((datastoreData) => {
          adjacentDatastores.push(`${objData.info.mainUuid};\u003c${datastoreData.name}:${datastoreData.type}\u003e`);
        }));
      } else {
        adjacentDatastores.push(`${objData.info.mainUuid};\u003c${objData.info.data.datastore.ManagedObjectReference.name}:${objData.info.data.datastore.ManagedObjectReference.type}\u003e`);
      }

      return adjacentDatastores;
    }

    return [];
  }

  /**
   * Special use/case
   * Since VM Disks are not connection objects, we inspect directly the VM to get the disks information.
   * Gets and returns nodes and adjacent Disks from VM object
   */
  private getAdjacentDisks(nodes, objData): { nodes: { nodes: { [key: string]: ImTreeNode } }; adjacentDisks: string[]} {
    const adjacentDisks = [];

    if (objData.type === 'VirtualMachine' && objData.info.data['config.hardware.device'].VirtualDevice) {

      objData.info.data['config.hardware.device'].VirtualDevice.forEach((device) => {

        if (device.xsi_type === 'VirtualDisk') {
          const diskId = `${objData.info.mainUuid};\u003c${device.backing.fileName}:${device.xsi_type}\u003e`;
          const datastoreId = `${objData.info.mainUuid};\u003c${device.backing.datastore.name}:${device.backing.datastore.type}\u003e`;

          adjacentDisks.push(diskId);

          // Set special VirtualDisk node
          nodes.nodes[diskId] = {
            id: diskId,
            nodeInfo: device,
            label: device.deviceInfo.label,
            labelMinor: device.xsi_type,
            rank: device.xsi_type + '/' + device.backing.diskMode,
            shape: this.getShapeByType(device.xsi_type),
            stack: false,
            metadata: [
              {
                id: 'kubernetes_node_type',
                label: 'Type',
                value: 'Deployment',
                priority: 1
              },
              {
                id: 'kubernetes_namespace',
                label: 'Namespace',
                value: 'inaregames-com',
                priority: 2
              },
              {
                id: 'kubernetes_created',
                label: 'Created',
                value: '2019-04-09T17:49:31Z',
                priority: 3,
                dataType: 'datetime'
              },
              {
                id: 'kubernetes_observed_generation',
                label: 'Observed gen.',
                value: 22,
                priority: 4,
                dataType: 'number'
              },
              {
                id: 'kubernetes_desired_replicas',
                label: 'Desired replicas',
                value: 1,
                priority: 5,
                dataType: 'number'
              },
              {
                id: 'pod',
                label: '# Pods',
                value: 1,
                priority: 6,
                dataType: 'number'
              },
              {
                id: 'kubernetes_strategy',
                label: 'Strategy',
                value: 'Recreate',
                priority: 7
              }
            ],
            metrics: [
              {
                id: 'docker_cpu_total_usage',
                label: 'CPU',
                format: 'percent',
                value: 0,
                priority: 1,
                samples: null,
                min: 0,
                max: 100,
                url: 0
              },
              {
                id: 'docker_memory_usage',
                label: 'Memory',
                format: 'filesize',
                value: 178925568,
                priority: 2,
                samples: null,
                min: 177053696,
                max: 4138717184,
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

    if (objData.type === 'VirtualMachine' && objData.info.data['config.hardware.device'].VirtualDevice) {

      objData.info.data['config.hardware.device'].VirtualDevice.forEach((device) => {

        if (device.xsi_type === 'VirtualVmxnet3') {
          const nicId = `${objData.info.mainUuid};\u003c${device.backing.uuid}:${device.xsi_type}\u003e`;
          const networkId = `${objData.info.mainUuid};\u003c${device.backing.network.name}:${device.backing.network.type}\u003e`;

          adjacentNetworks.push(nicId);

          // Set special VirtualDisk node
          nodes.nodes[nicId] = {
            id: nicId,
            nodeInfo: device,
            label: device.deviceInfo.label,
            labelMinor: device.deviceInfo.summary,
            rank: device.xsi_type,
            shape: this.getShapeByType(device.xsi_type),
            stack: false,
            metadata: [
              {
                id: 'kubernetes_node_type',
                label: 'Type',
                value: 'Deployment',
                priority: 1
              },
              {
                id: 'kubernetes_namespace',
                label: 'Namespace',
                value: 'inaregames-com',
                priority: 2
              },
              {
                id: 'kubernetes_created',
                label: 'Created',
                value: '2019-04-09T17:49:31Z',
                priority: 3,
                dataType: 'datetime'
              },
              {
                id: 'kubernetes_observed_generation',
                label: 'Observed gen.',
                value: 22,
                priority: 4,
                dataType: 'number'
              },
              {
                id: 'kubernetes_desired_replicas',
                label: 'Desired replicas',
                value: 1,
                priority: 5,
                dataType: 'number'
              },
              {
                id: 'pod',
                label: '# Pods',
                value: 1,
                priority: 6,
                dataType: 'number'
              },
              {
                id: 'kubernetes_strategy',
                label: 'Strategy',
                value: 'Recreate',
                priority: 7
              }
            ],
            metrics: [
              {
                id: 'docker_cpu_total_usage',
                label: 'CPU',
                format: 'percent',
                value: 0,
                priority: 1,
                samples: null,
                min: 0,
                max: 100,
                url: 0
              },
              {
                id: 'docker_memory_usage',
                label: 'Memory',
                format: 'filesize',
                value: 178925568,
                priority: 2,
                samples: null,
                min: 177053696,
                max: 4138717184,
                url: 0
              }
            ],
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
     * Set basic node info
     */

    nodes.nodes[nodeId] = {
      id: nodeId,
      nodeInfo: objData,
      label: (objData.name ? objData.name : objData.host),
      labelMinor: (objData.description ? objData.description : objData.type),
      rank: objData.type + '/' + (objData.info ? objData.info.obj.name : objData.host),
      shape: this.getShapeByType(objData.type),
      stack: this.isTypeStacked(objData.type),
      metadata: [
        {
          id: 'kubernetes_node_type',
          label: 'Type',
          value: 'Deployment',
          priority: 1
        },
        {
          id: 'kubernetes_namespace',
          label: 'Namespace',
          value: 'inaregames-com',
          priority: 2
        },
        {
          id: 'kubernetes_created',
          label: 'Created',
          value: '2019-04-09T17:49:31Z',
          priority: 3,
          dataType: 'datetime'
        },
        {
          id: 'kubernetes_observed_generation',
          label: 'Observed gen.',
          value: 22,
          priority: 4,
          dataType: 'number'
        },
        {
          id: 'kubernetes_desired_replicas',
          label: 'Desired replicas',
          value: 1,
          priority: 5,
          dataType: 'number'
        },
        {
          id: 'pod',
          label: '# Pods',
          value: 1,
          priority: 6,
          dataType: 'number'
        },
        {
          id: 'kubernetes_strategy',
          label: 'Strategy',
          value: 'Recreate',
          priority: 7
        }
      ],
      metrics: [
        {
          id: 'docker_cpu_total_usage',
          label: 'CPU',
          format: 'percent',
          value: 0,
          priority: 1,
          samples: null,
          min: 0,
          max: 100,
          url: 0
        },
        {
          id: 'docker_memory_usage',
          label: 'Memory',
          format: 'filesize',
          value: 178925568,
          priority: 2,
          samples: null,
          min: 177053696,
          max: 4138717184,
          url: 0
        }
      ],
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

      // Childrens adjacent
      nodes.nodes[nodeId].adjacency.push(...this.getAdjacentChildrens(nodeId, objData, connectionNodes));

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

    const activeObject = this.InfrastructureManager.getActiveConnection();

    // Return everything if no activeConnection. Set pseudo elements
    if (!activeObject)  {
      nodes = this.setPseudoNodes(nodes);

      this.InfrastructureManager.getConnections().forEach((connection: ImConnection) => {
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
