import {Injectable} from '@angular/core';

import {SysosAppInfrastructureManagerService} from "../sysos-app-infrastructure-manager.service";

import {VMWareObject} from "../../types/vmware-object";

@Injectable({
  providedIn: 'root'
})
export class SysosAppInfrastructureVmwareObjectHelpersService {

  constructor(private InfrastructureManager: SysosAppInfrastructureManagerService) {
  }

  /**
   * Get Parent object by object type
   */
  getParentObjectByType(connectionUuid: string, type: string, ofParent: string): string {
    const parentObject: VMWareObject = this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((vmwareObj: VMWareObject) => {
      return vmwareObj.info.obj.name === ofParent;
    });

    if (parentObject.type === type) return parentObject.info.obj.name;
    return this.getParentObjectByType(connectionUuid, type, parentObject.info.parent.name);
  }

  /**
   * Returns all VMWare objects by specific type
   */
  getObjectByType(connectionUuid: string, type: string): VMWareObject[] {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.filter((vmwareObj: VMWareObject) => {
      return vmwareObj.type === type;
    });
  }

  /**
   * Returns VMWare object by specific id
   */
  getObjectById(connectionUuid: string, objectId: string): VMWareObject {
    return this.InfrastructureManager.getConnectionByUuid(connectionUuid).data.Data.find((vmwareObj: VMWareObject) => {
      return vmwareObj.info.obj.name === objectId;
    });
  }
}
