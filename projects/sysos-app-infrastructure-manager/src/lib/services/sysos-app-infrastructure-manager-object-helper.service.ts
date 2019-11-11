import {Injectable} from '@angular/core';

import {SysosAppInfrastructureManagerService} from './sysos-app-infrastructure-manager.service';
import {ImDataObject} from '../types/im-data-object';
import {ImConnection} from '../types/im-connection';

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureManagerObjectHelperService {

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  /**
   * Generates objectUuid
   */
  generateObjectUuid(connection: ImConnection, object: ImDataObject): string {
    return `${connection.uuid};\u003c${object.info.obj.name}:${object.info.obj.type}\u003e`;
  }

  /**
   * Returns all objects by specific type
   */
  getObjectByType(connectionUuid: string = null, type: string): ImDataObject[] {
    // Get objects on single connection
    if (connectionUuid) return this.getObjectByTypeInConnection(connectionUuid, type);

    const results: ImDataObject[] = [];

    // Get objects on all connections
    this.InfrastructureManager.getConnections().forEach((connection: ImConnection) => {
      this.getObjectByTypeInConnection(type, connection.uuid).forEach((imObj: ImDataObject) => {
        results.push(imObj);
      });
    });

    return results;
  }

  /**
   * Returns all objects by specific type in specific connection
   */
  private getObjectByTypeInConnection(connectionUuid: string, type: string): ImDataObject[] {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.filter((imObj: ImDataObject) => {
      return imObj.type === type;
    });
  }

  /**
   * Get closest Parent object by object type
   */
  getParentObjectByType(connectionUuid: string, type: string, ofParent: string): ImDataObject {
    const parentObject: ImDataObject = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((imObj: ImDataObject) => {
      return imObj.info.obj.name === ofParent;
    });

    if (parentObject.type === type) return parentObject;
    return this.getParentObjectByType(connectionUuid, type, parentObject.info.parent.name);
  }

  /**
   * Returns object by specific namedId
   */
  getObjectById(connectionUuid: string, namedId: string): ImDataObject {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((imObj: ImDataObject) => {
      return imObj.info.obj.name === namedId;
    });
  }

  /**
   * Returns object by specific objectUuid
   */
  getObjectByUuid(connectionUuid: string, objectUuid: string): ImDataObject {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((imObj: ImDataObject) => {
      return imObj.info.uuid === objectUuid;
    });
  }
}
