import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';

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
    connectionData: ConnectionData,
    managedFolder: ManagedObjectReference & { $type: 'Folder' },
    path: string,
    name?: string,
    asTemplate: boolean = false,
    managedPool?: ManagedObjectReference & { $type: 'ResourcePool' },
    managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<RegisterVM_Task xmlns='urn:vim25'>
      <_this type='Folder'>${managedFolder._value}</_this>
      <path>${path}</path>
      ${(name ? `<name>${name}</name>` : '')}
      <asTemplate>${asTemplate}</asTemplate>
      <pool type='ResourcePool'>${managedPool._value}</pool>
      <host type='HostSystem'>${managedHost._value}</host>
    </RegisterVM_Task>`;
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
