import {Injectable} from '@angular/core';

import {AnyOpsOSLibNodeVmwareHelpersService} from '@anyopsos/lib-node-vmware';
import {AnyOpsOSLibNodeNetappHelpersService} from '@anyopsos/lib-node-netapp';
import {AnyOpsOSLibNodeDockerHelpersService} from '@anyopsos/lib-node-docker';
import {AnyOpsOSLibNodeKubernetesHelpersService} from '@anyopsos/lib-node-kubernetes';
import {AnyOpsOSLibNodeLinuxHelpersService} from '@anyopsos/lib-node-linux';
import {AnyOpsOSLibNodeSnmpHelpersService} from '@anyopsos/lib-node-snmp';

import {ConnectionVmware} from '@anyopsos/module-node-vmware';
import {ConnectionDocker} from '@anyopsos/module-node-docker';
import {ConnectionKubernetes} from '@anyopsos/module-node-kubernetes';
import {ConnectionSnmp} from '@anyopsos/module-node-snmp';
import {ConnectionLinux} from '@anyopsos/module-node-linux';
import {ConnectionNetapp} from '@anyopsos/module-node-netapp';

import {DataObject} from '@anyopsos/backend-core/app/types/data-object';
import {ConnectionTypes} from '@anyopsos/backend-core/app/types/connection-types';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibNodeHelpersService {

  constructor(private readonly LibNodeVmwareHelpers: AnyOpsOSLibNodeVmwareHelpersService,
              private readonly LibNodeNetappHelpers: AnyOpsOSLibNodeNetappHelpersService,
              private readonly LibNodeDockerHelpers: AnyOpsOSLibNodeDockerHelpersService,
              private readonly LibNodeKubernetesHelpers: AnyOpsOSLibNodeKubernetesHelpersService,
              private readonly LibNodeSnmpHelpers: AnyOpsOSLibNodeSnmpHelpersService,
              private readonly LibNodeLinuxHelpers: AnyOpsOSLibNodeLinuxHelpersService) {
  }

  /**
   * Checks if string is an ObjectUuid or normal uuid
   *
   * @example
   * 'ddcc54da-a215-49bf-8dcb-c4f64f21320b#kubernetes;<MyFrontendPod:Pod>' true
   * 'ddcc54da-a215-49bf-8dcb-c4f64f21320b' false
   */
  isObjectUuid(uuid: string): boolean {
    if (uuid.includes('#') && uuid.includes(';')) return true;
    return false;
  }

  /**
   * Generates objectUuid
   */
  generateObjectUuid(connection: ConnectionTypes, object: DataObject): string {
    return `${connection.uuid}#${connection.type};\u003c${object.info.obj.name}:${object.info.obj.type}\u003e`;
  }

  /**
   * Extracts main uuid from objectUuid
   *
   * @example
   * // returns 'ddcc54da-a215-49bf-8dcb-c4f64f21320b'
   * extractMainUuidFromObjectUuid('ddcc54da-a215-49bf-8dcb-c4f64f21320b#kubernetes;<MyFrontendPod:Pod>');
   */
  extractMainUuidFromObjectUuid(objectUuid: string): string {
    if (this.isObjectUuid(objectUuid)) {
      return objectUuid.substring(0, objectUuid.indexOf('#'));
    }

    return objectUuid;
  }

  /**
   * Extracts main type from objectUuid
   *
   * @example
   * // returns 'kubernetes'
   * extractMainTypeFromObjectUuid('ddcc54da-a215-49bf-8dcb-c4f64f21320b#kubernetes;<MyFrontendPod:Pod>');
   */
  extractMainTypeFromObjectUuid(objectUuid: string): ConnectionTypes['type'] {
    if (!this.isObjectUuid(objectUuid)) throw new Error('resource_invalid');

    return objectUuid.substring(
      objectUuid.lastIndexOf("#") + 1,
      objectUuid.lastIndexOf(";")
    ) as ConnectionTypes['type'];

  }

  /**
   * CONNECTION
   */

  /**
   * Return all connections
   */
  getConnections(): ConnectionTypes[] {
    const vmwareConnections: ConnectionVmware[] = this.LibNodeVmwareHelpers.getAllConnections();
    const netappConnections: ConnectionNetapp[] = this.LibNodeNetappHelpers.getAllConnections();
    const dockerConnections: ConnectionDocker[] = this.LibNodeDockerHelpers.getAllConnections();
    const kubernetesConnections: ConnectionKubernetes[] = this.LibNodeKubernetesHelpers.getAllConnections();
    const linuxConnections: ConnectionLinux[] = this.LibNodeLinuxHelpers.getAllConnections();
    const snmpConnections: ConnectionSnmp[] = this.LibNodeSnmpHelpers.getAllConnections();

    return [...vmwareConnections, ...netappConnections, ...dockerConnections, ...kubernetesConnections, ...linuxConnections, ...snmpConnections];
  }

  /**
   * Return all connections matching 'type'
   */
  getConnectionsByType(connectionType: string): ConnectionTypes[] {
    if (!connectionType) throw new Error('invalid_resource');

    if (connectionType === 'vmware') return this.LibNodeVmwareHelpers.getAllConnections();
    if (connectionType === 'netapp') return this.LibNodeNetappHelpers.getAllConnections();
    if (connectionType === 'docker') return this.LibNodeDockerHelpers.getAllConnections();
    if (connectionType === 'kubernetes') return this.LibNodeKubernetesHelpers.getAllConnections();
    if (connectionType === 'linux') return this.LibNodeLinuxHelpers.getAllConnections();
    if (connectionType === 'snmp') return this.LibNodeSnmpHelpers.getAllConnections();
  }

  /**
   * Get connection full object matching 'uuid'
   */
  getConnectionByUuid(connectionUuid: string, connectionType: string): ConnectionTypes {
    if (!connectionUuid || !connectionType) throw new Error('invalid_resource');

    if (connectionType === 'vmware') return this.LibNodeVmwareHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'netapp') return this.LibNodeNetappHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'docker') return this.LibNodeDockerHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'kubernetes') return this.LibNodeKubernetesHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'linux') return this.LibNodeLinuxHelpers.getConnectionByUuid(connectionUuid);
    if (connectionType === 'snmp') return this.LibNodeSnmpHelpers.getConnectionByUuid(connectionUuid);
  }

  /**
   * CONNECTION DATA
   */

  /**
   * Return all data in a connection
   */
  getConnectionData(connectionUuid: string, connectionType: string): DataObject[] {
    const currentConnection: ConnectionTypes = this.getConnectionByUuid(connectionUuid, connectionType);
    return currentConnection.data.Data;
  }

  /**
   * Returns all objects by specific type in specific connection
   */
  getObjectByTypeInConnection(connectionUuid: string, connectionType: string, type: string): DataObject[] {
    const currentConnectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);
    return currentConnectionData.filter((imObj: DataObject) => {
      return imObj.type === type;
    });
  }

  /**
   * Returns all objects by specific type, filtered by all connections, all connections in a type or a single connection
   */
  getObjectsByType(connectionUuid: string = null, connectionType: string = null, type: string): DataObject[] {
    if (connectionUuid && !connectionType) throw new Error('invalid_resource');

    const results: DataObject[] = [];

    // Get objects on all connections by connectionType
    if (connectionType && !connectionUuid) {
      const currentConnections: ConnectionTypes[] = this.getConnectionsByType(connectionType);

      for (const connection of currentConnections) {
        const connectionObjects: DataObject[] = this.getObjectByTypeInConnection(connection.uuid, connection.type, type);
        connectionObjects.forEach((imObj: DataObject) => {
          results.push(imObj);
        });
      }

      return results;
    }

    // Get objects by type on single connection
    if (connectionUuid) return this.getObjectByTypeInConnection(connectionUuid, connectionType, type);

    // Get objects by type on all connections
    const allConnections: ConnectionTypes[] = this.getConnections();

    for (const connection of allConnections) {
      const connectionObjects: DataObject[] = this.getObjectByTypeInConnection(connection.uuid, connection.type, type);
      connectionObjects.forEach((imObj: DataObject) => {
        results.push(imObj);
      });
    }

    return results;
  }

  /**
   * Get closest Parent object by object type
   */
  getParentObjectByType(connectionUuid: string, connectionType: string, type: string, parentObj: { name: string; type: string; }): DataObject {
    const currentConnectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);

    const parentObject: DataObject = currentConnectionData.find((imObj: DataObject) => {
      return imObj.info.obj.name === parentObj.name && imObj.info.obj.type === parentObj.type;
    });

    if (!parentObject) return null;
    if (parentObject.type === type) return parentObject;

    return this.getParentObjectByType(connectionUuid, connectionType, type, parentObject.info.parent);
  }

  /**
   * Returns 1st level or recursively child objects of a parent
   */
  getChildObjects(connectionUuid: string, connectionType: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true): DataObject[] {

    // Get all child
    const currentConnectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);

    const childObjects: DataObject[] = currentConnectionData.filter((imObj: DataObject) => {
      return imObj.info.parent &&
        imObj.info.parent.name === currentObj.name &&
        imObj.info.parent.type === currentObj.type;
    });

    if (!searchRecursive) return childObjects;

    childObjects.map((imObj: DataObject) => {
      childObjects.push(...this.getChildObjects(connectionUuid, connectionType, imObj.info.obj, true));
    });

    return childObjects;
  }

  /**
   * Returns 1st level or recursively child objects of a parent by child object type
   */
  getChildObjectsByType(connectionUuid: string, connectionType: string, childType: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true): DataObject[] {

    const childObjects: DataObject[] = this.getChildObjects(connectionUuid, connectionType, currentObj, searchRecursive);
    return childObjects.filter((imObj: DataObject) => {
      return imObj.type === childType;
    });

  }

  /**
   * Returns object by specific namedId
   */
  getObjectByName(connectionUuid: string, connectionType: string, namedId: string): DataObject {

    const connectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);
    return connectionData.find((imObj: DataObject) => {
      return imObj.info.obj.name === namedId;
    });
  }

  /**
   * Returns object by specific objectUuid
   */
  getObjectByUuid(connectionUuid: string = null, connectionType: string = null, objectUuid: string): DataObject {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.extractMainUuidFromObjectUuid(objectUuid);
      connectionType = this.extractMainTypeFromObjectUuid(objectUuid);
    }

    const connectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);
    return connectionData.find((imObj: DataObject) => {
      return imObj.info.uuid === objectUuid;
    });
  }

  /**
   * Returns object by by custom filter
   */
  getObjectByCustomFilter(connectionUuid: string, connectionType: string = null, customFilter: (imObj) => boolean): DataObject[] {

    const connectionData: DataObject[] = this.getConnectionData(connectionUuid, connectionType);
    return connectionData.filter(customFilter);
  }

}
