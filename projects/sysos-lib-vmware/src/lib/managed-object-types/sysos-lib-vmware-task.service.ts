import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostFirewallRulesetRulesetSpec} from '../types/host-firewall-ruleset-ruleset-spec';
import {MethodFault} from '../types/method-fault';
import {TaskInfoState} from '../types/task-info-state';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareTaskService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CancelTask() {

  }

  SetTaskDescription() {

  }

  SetTaskState(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { $type: 'Task' },
    state: TaskInfoState,
    result?: any,
    fault?: MethodFault
  ) {
    const xml = `<SetTaskState xmlns='urn:vim25'>
      <_this type='Task'>${managedTask._value}</_this>
      <state>${state}</state>
      ${result ? `<result>${this.SysosLibVmwareHelper.setDynamicProperties(result)}</result>` : ''}
      ${fault ? `<fault>${this.SysosLibVmwareHelper.setDynamicProperties(fault)}</fault>` : ''}
    </SetTaskState>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(data.SetTaskStateResponse[0]));
    })).toPromise();
  }

  UpdateProgress(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { $type: 'Task' },
    percentDone: number
  ) {
    const xml = `<UpdateProgress xmlns='urn:vim25'>
      <_this type='Task'>${managedTask._value}</_this>
      <percentDone>${percentDone}</percentDone>
    </UpdateProgress>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(data.UpdateProgressResponse[0]));
    })).toPromise();
  }
}
