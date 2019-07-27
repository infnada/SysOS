import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {TaskInfoState} from '../types/task-info-state';
import {MethodFault} from '../types/method-fault';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareTaskManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CreateCollectorForTasks() {

  }

  CreateTask(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { type: 'Task' },
    taskTypeId: string,
    initiatedBy: string = 'SysOS Administrator',
    cancelable: boolean = false,
    parentTaskKey?: string,
    activationId?: string
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <CreateTask xmlns='urn:vim25'>
      <_this type='TaskManager'>TaskManager</_this>
      <obj type='Task'>${managedTask.value}</obj>
      <taskTypeId>${taskTypeId}</taskTypeId>
      <initiatedBy>${initiatedBy}</initiatedBy>
      <cancelable>${cancelable}</cancelable>
      ${parentTaskKey ? `<parentTaskKey>${parentTaskKey}</parentTaskKey>` : ''}
      ${activationId ? `<activationId>${activationId}</activationId>` : ''}
    </CreateTask>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.CreateTaskResponse[0]);
    })).toPromise();
  }
}
