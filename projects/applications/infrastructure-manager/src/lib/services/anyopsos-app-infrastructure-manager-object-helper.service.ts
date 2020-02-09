import {Injectable} from '@angular/core';

import {DataObject} from '@anyopsos/backend/app/types/data-object';
import {ConnectionTypes} from '@anyopsos/backend/app/types/connection-types';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerObjectHelperService {

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
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
    if (objectUuid.includes('#')) {
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
    if (objectUuid.includes(';') && objectUuid.includes('#')) {

      return objectUuid.substring(
        objectUuid.lastIndexOf("#") + 1,
        objectUuid.lastIndexOf(";")
      ) as ConnectionTypes['type'];
    }

    throw new Error('resource_invalid');
  }

  /**
   * Return all data in a connection
   */
  private async getConnectionData(connectionUuid: string, connectionType: string): Promise<DataObject[]> {
    const currentConnection: ConnectionTypes = await this.InfrastructureManager.getConnectionByUuid(connectionUuid, connectionType);
    return currentConnection.data.Data;
  }

  /**
   * Returns all objects by specific type in specific connection
   */
  private async getObjectByTypeInConnection(connectionUuid: string, connectionType: string, type: string): Promise<DataObject[]> {
    const currentConnectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);
    return currentConnectionData.filter((imObj: DataObject) => {
      return imObj.type === type;
    });
  }

  /**
   * Returns all objects by specific type, filtered by all connections, all connections in a type or a single connection
   */
  async getObjectsByType(connectionUuid: string = null, connectionType: string = null, type: string): Promise<DataObject[]> {
    if (connectionUuid && !connectionType) throw new Error('invalid_resource');

    const results: DataObject[] = [];

    // Get objects on all connections by connectionType
    if (connectionType && !connectionUuid) {
      const currentConnections: ConnectionTypes[] = await this.InfrastructureManager.getConnectionsByType(connectionType);

      for (const connection of currentConnections) {
        const connectionObjects: DataObject[] = await this.getObjectByTypeInConnection(connection.uuid, connection.type, type);
        connectionObjects.forEach((imObj: DataObject) => {
          results.push(imObj);
        });
      }

      return results;
    }

    // Get objects by type on single connection
    if (connectionUuid) return this.getObjectByTypeInConnection(connectionUuid, connectionType, type);

    // Get objects by type on all connections
    const allConnections: ConnectionTypes[] = await this.InfrastructureManager.getConnections();

    for (const connection of allConnections) {
      const connectionObjects: DataObject[] = await this.getObjectByTypeInConnection(connection.uuid, connection.type, type);
      connectionObjects.forEach((imObj: DataObject) => {
        results.push(imObj);
      });
    }

    return results;
  }

  /**
   * Get closest Parent object by object type
   */
  async getParentObjectByType(connectionUuid: string, connectionType: string, type: string, parentObj: { name: string; type: string; }): Promise<DataObject> {
    const currentConnectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);

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
  async getChildObjects(connectionUuid: string, connectionType: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true): Promise<DataObject[]> {

    // Get all child
    const currentConnectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);

    const childObjects: DataObject[] = currentConnectionData.filter((imObj: DataObject) => {
      return imObj.info.parent &&
        imObj.info.parent.name === currentObj.name &&
        imObj.info.parent.type === currentObj.type;
    });

    if (!searchRecursive) return childObjects;

    childObjects.map(async (imObj: DataObject) => {
      childObjects.push(...await this.getChildObjects(connectionUuid, connectionType, imObj.info.obj, true));
    });

    return childObjects;
  }

  /**
   * Returns 1st level or recursively child objects of a parent by child object type
   */
  async getChildObjectsByType(connectionUuid: string, connectionType: string, childType: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true): Promise<DataObject[]> {

    const childObjects: DataObject[] = await this.getChildObjects(connectionUuid, connectionType, currentObj, searchRecursive);
    return childObjects.filter((imObj: DataObject) => {
      return imObj.type === childType;
    });

  }

  /**
   * Returns object by specific namedId
   */
  async getObjectByName(connectionUuid: string, connectionType: string, namedId: string): Promise<DataObject> {

    const connectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);
    return connectionData.find((imObj: DataObject) => {
      return imObj.info.obj.name === namedId;
    });
  }

  /**
   * Returns object by specific objectUuid
   */
  async getObjectByUuid(connectionUuid: string = null, connectionType: string = null, objectUuid: string): Promise<DataObject> {
    if (!connectionUuid != !connectionType) throw new Error('invalid_resource'); // XOR

    if (!connectionUuid) {
      connectionUuid = this.extractMainUuidFromObjectUuid(objectUuid);
      connectionType = this.extractMainTypeFromObjectUuid(objectUuid);
    }

    const connectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);
    return connectionData.find((imObj: DataObject) => {
      return imObj.info.uuid === objectUuid;
    });
  }

  /**
   * Returns object by by custom filter
   */
  async getObjectByCustomFilter(connectionUuid: string, connectionType: string = null, customFilter: (imObj) => boolean): Promise<DataObject[]> {

    const connectionData: DataObject[] = await this.getConnectionData(connectionUuid, connectionType);
    return connectionData.filter(customFilter);
  }
}
