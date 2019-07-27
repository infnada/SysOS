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
    managedTask: ManagedObjectReference & { type: 'Task' },
    state: TaskInfoState,
    result?: any,
    fault?: MethodFault
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <SetTaskState xmlns='urn:vim25'>
      <_this type='Task'>${managedTask.value}</_this>
      <state>${state}</state>
      ${result ? `<result>${this.SysosLibVmwareHelper.setDynamicProperties(result)}</result>` : ''}
      ${fault ? `<fault>${this.SysosLibVmwareHelper.setDynamicProperties(fault)}</fault>` : ''}
    </SetTaskState>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.SetTaskStateResponse[0]);
    })).toPromise();
  }

  UpdateProgress(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { type: 'Task' },
    percentDone: number
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <UpdateProgress xmlns='urn:vim25'>
      <_this type='Task'>${managedTask.value}</_this>
      <percentDone>${percentDone}</percentDone>
    </UpdateProgress>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.UpdateProgressResponse[0]);
    })).toPromise();
  }
}
