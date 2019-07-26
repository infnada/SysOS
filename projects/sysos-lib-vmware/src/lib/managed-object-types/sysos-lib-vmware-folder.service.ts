import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareFolderService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AddStandaloneHost_Task() {

  }

  CreateCluster() {

  }

  CreateClusterEx() {

  }

  CreateDatacenter() {

  }

  CreateDVS_Task() {

  }

  CreateFolder() {

  }

  CreateStoragePod() {

  }

  CreateVM_Task() {

  }

  MoveIntoFolder_Task() {

  }

  RegisterVM_Task(
    connectionData: connectionData,
    managedFolder: ManagedObjectReference & { type: 'Folder' },
    path: string,
    name?: string,
    asTemplate: boolean = false,
    managedPool?: ManagedObjectReference & { type: 'ResourcePool' },
    managedHost?: ManagedObjectReference & { type: 'HostSystem' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RegisterVM_Task xmlns="urn:vim25">
      <_this type="Folder">${managedFolder.value}</_this>
      <path>${path}</path>
      ${(name ? `<name>${name}</name>` : '')}
      <asTemplate>${asTemplate}</asTemplate>
      <pool type="ResourcePool">${managedPool.value}</pool>
      <host type="HostSystem">${managedHost.value}</host>
    </RegisterVM_Task>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.RegisterVM_TaskResponse[0].returnval[0]._;
        return this.SysosLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.SysosLibVmwareHelper.validResponse(res);
        });
      }

      return data.RegisterVM_TaskResponse[0].returnval[0];
    })).toPromise();
  }

  UnregisterAndDestroy_Task() {

  }
}
