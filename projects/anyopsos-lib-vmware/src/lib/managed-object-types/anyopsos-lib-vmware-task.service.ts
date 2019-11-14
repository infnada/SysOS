import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {HostFirewallRulesetRulesetSpec} from '../types/host-firewall-ruleset-ruleset-spec';
import {MethodFault} from '../types/method-fault';
import {TaskInfoState} from '../types/task-info-state';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareTaskService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
      ${result ? `<result>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(result)}</result>` : ''}
      ${fault ? `<fault>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(fault)}</fault>` : ''}
    </SetTaskState>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(data.SetTaskStateResponse[0]));
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
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(data.UpdateProgressResponse[0]));
    })).toPromise();
  }
}
