import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {TaskFilterSpec} from '../types/task-filter-spec';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareTaskManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CreateCollectorForTasks(
    connectionData: ConnectionData,
    filter: TaskFilterSpec
  ) {
    const xml = `<CreateCollectorForTasks xmlns='urn:vim25'>
      <_this type='TaskManager'>TaskManager</_this>
      <filter>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(filter)}</filter>
    </CreateCollectorForTasks>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(data.CreateCollectorForTasksResponse[0].returnval[0]));
    })).toPromise();
  }

  CreateTask(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { $type: 'Task' },
    taskTypeId: string,
    initiatedBy: string = 'anyOpsOS Administrator',
    cancelable: boolean = false,
    parentTaskKey?: string,
    activationId?: string
  ) {
    const xml = `<CreateTask xmlns='urn:vim25'>
      <_this type='TaskManager'>TaskManager</_this>
      <obj type='Task'>${managedTask._value}</obj>
      <taskTypeId>${taskTypeId}</taskTypeId>
      <initiatedBy>${initiatedBy}</initiatedBy>
      <cancelable>${cancelable}</cancelable>
      ${parentTaskKey ? `<parentTaskKey>${parentTaskKey}</parentTaskKey>` : ''}
      ${activationId ? `<activationId>${activationId}</activationId>` : ''}
    </CreateTask>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(data.CreateTaskResponse[0].returnval[0]));
    })).toPromise();
  }
}
