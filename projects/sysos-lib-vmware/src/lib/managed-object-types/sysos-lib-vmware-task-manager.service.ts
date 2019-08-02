import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';
import {TaskFilterSpec} from '../types/task-filter-spec';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareTaskManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CreateCollectorForTasks(
    connectionData: ConnectionData,
    filter: TaskFilterSpec
  ) {
    const xml = `<CreateCollectorForTasks xmlns='urn:vim25'>
      <_this type='TaskManager'>TaskManager</_this>
      <filter>${this.SysosLibVmwareHelper.setDynamicProperties(filter)}</filter>
    </CreateCollectorForTasks>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(data.CreateCollectorForTasksResponse[0].returnval[0]));
    })).toPromise();
  }

  CreateTask(
    connectionData: ConnectionData,
    managedTask: ManagedObjectReference & { $type: 'Task' },
    taskTypeId: string,
    initiatedBy: string = 'SysOS Administrator',
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
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(data.CreateTaskResponse[0].returnval[0]));
    })).toPromise();
  }
}
