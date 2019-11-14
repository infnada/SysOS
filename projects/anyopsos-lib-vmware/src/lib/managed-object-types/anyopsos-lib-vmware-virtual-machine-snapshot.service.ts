import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareVirtualMachineSnapshotService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ExportSnapshot() {

  }

  RemoveSnapshot_Task(connectionData: ConnectionData,
                      managedVirtualMachineSnapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' },
                      removeChildren: boolean,
                      consolidate: boolean = true,
                      returnOnTaskFinish: boolean = true
  ) {
    const xml = `<RemoveSnapshot_Task xmlns='urn:vim25'>
      <_this type='VirtualMachineSnapshot'>${managedVirtualMachineSnapshot._value}</_this>
      <removeChildren>${removeChildren}</removeChildren>
      <consolidate>${consolidate}</consolidate>
    </RemoveSnapshot_Task>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.RemoveSnapshot_TaskResponse[0].returnval[0]._;
        return this.AnyOpsOSLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.AnyOpsOSLibVmwareHelper.validResponse(res);
        });
      }

      return this.AnyOpsOSLibVmwareHelper.validResponse(data.RemoveSnapshot_TaskResponse[0].returnval[0]);
    })).toPromise();

  }

  RenameSnapshot() {

  }

  RevertToSnapshot_Task(
    connectionData: ConnectionData,
    managedVMSnapshot: ManagedObjectReference & { $type: 'VirtualMachineSnapshot' },
    managedHost?: ManagedObjectReference & { $type: 'HostSystem' },
    suppressPowerOn: boolean = false,
    returnOnTaskFinish: boolean = true
  ) {
    const xml = `<RevertToSnapshot_Task xmlns='urn:vim25'>
      <_this type='VirtualMachineSnapshot'>${managedVMSnapshot._value}</_this>
      ${(managedHost ? `<host type='HostSystem'>${managedHost._value}</host>` : '')}
      <suppressPowerOn>${suppressPowerOn}</suppressPowerOn>
    </RevertToSnapshot_Task>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      if (returnOnTaskFinish) {
        const taskId = data.RevertToSnapshot_TaskResponse[0].returnval[0]._;
        return this.AnyOpsOSLibVmwareHelper.getTaskStatus(connectionData, taskId).then((res: any) => {
          return this.AnyOpsOSLibVmwareHelper.validResponse(res);
        });
      }

      return this.AnyOpsOSLibVmwareHelper.validResponse(data.RevertToSnapshot_TaskResponse[0].returnval[0]);
    })).toPromise();
  }
}
