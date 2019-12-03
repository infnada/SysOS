import {Injectable} from '@angular/core';

import {AnyOpsOSAppInfrastructureManagerService} from './anyopsos-app-infrastructure-manager.service';
import {ImDataObject} from '../types/im-data-object';
import {ImConnection} from '../types/connections/im-connection';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSAppInfrastructureManagerObjectHelperService {

  constructor(private InfrastructureManager: AnyOpsOSAppInfrastructureManagerService) {
  }

  private getConnectionData(connectionUuid: string): ImDataObject[] {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data;
  }

  /**
   * Generates objectUuid
   */
  generateObjectUuid(connection: ImConnection, object: ImDataObject): string {
    return `${connection.uuid};\u003c${object.info.obj.name}:${object.info.obj.type}\u003e`;
  }

  /**
   * Extracts main uuid from objectUuid
   */
  extractMainUuidFromObjectUuid(objectUuid): string {
    if (objectUuid.includes(';')) {
      return objectUuid.substring(0, objectUuid.indexOf(';'));
    }

    return objectUuid;
  }

  /**
   * Returns all objects by specific type
   */
  getObjectsByType(connectionUuid: string = null, type: string): ImDataObject[] {
    // Get objects on single connection
    if (connectionUuid) return this.getObjectByTypeInConnection(connectionUuid, type);

    const results: ImDataObject[] = [];

    // Get objects on all connections
    this.InfrastructureManager.getConnections().forEach((connection: ImConnection) => {
      this.getObjectByTypeInConnection(connection.uuid, type).forEach((imObj: ImDataObject) => {
        results.push(imObj);
      });
    });

    return results;
  }

  /**
   * Returns all objects by specific type in specific connection
   */
  private getObjectByTypeInConnection(connectionUuid: string, type: string): ImDataObject[] {
    return this.getConnectionData(connectionUuid).filter((imObj: ImDataObject) => {
      return imObj.type === type;
    });
  }

  /**
   * Get closest Parent object by object type
   */
  getParentObjectByType(connectionUuid: string, type: string, parentObj: { name: string; type: string; }): ImDataObject {
    const parentObject: ImDataObject = this.getConnectionData(connectionUuid).find((imObj: ImDataObject) => {
      return imObj.info.obj.name === parentObj.name && imObj.info.obj.type === parentObj.type;
    });

    if (!parentObject) return null;
    if (parentObject.type === type) return parentObject;

    return this.getParentObjectByType(connectionUuid, type, parentObject.info.parent);
  }

  /**
   * Returns child object of a parent
   */
  getChildObjects(connectionUuid: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true) {

    // Get all child
    const childObjects: ImDataObject[] = this.getConnectionData(connectionUuid).filter((imObj: ImDataObject) => {
      return imObj.info.parent &&
        imObj.info.parent.name === currentObj.name &&
        imObj.info.parent.type === currentObj.type;
    });

    if (!searchRecursive) return childObjects;

    childObjects.map((imObj: ImDataObject) => {
      childObjects.push(...this.getChildObjects(connectionUuid, imObj.info.obj, true));
    });

    return childObjects;
  }

  /**
   * Returns child objects of a parent by object type
   */
  getChildObjectsByType(connectionUuid: string, childType: string, currentObj: { name: string; type: string; }, searchRecursive: boolean = true): ImDataObject[] {

    return this.getChildObjects(connectionUuid, currentObj, searchRecursive).filter((imObj: ImDataObject) => {
      return imObj.type === childType;
    });

  }

  /**
   * Returns object by specific namedId
   */
  getObjectById(connectionUuid: string, namedId: string): ImDataObject {
    return this.getConnectionData(connectionUuid).find((imObj: ImDataObject) => {
      return imObj.info.obj.name === namedId;
    });
  }

  /**
   * Returns object by specific objectUuid
   */
  getObjectByUuid(connectionUuid: string, objectUuid: string): ImDataObject {
    return this.getConnectionData(connectionUuid).find((imObj: ImDataObject) => {
      return imObj.info.uuid === objectUuid;
    });
  }
}
