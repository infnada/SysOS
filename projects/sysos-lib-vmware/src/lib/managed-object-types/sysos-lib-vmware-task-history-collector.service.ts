import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareTaskHistoryCollectorService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  ReadNextTasks(
    connectionData: ConnectionData,
    managedTaskCollector: ManagedObjectReference & { $type: 'TaskHistoryCollector' },
    maxCount: number
  ) {
    const xml = `<ReadNextTasks xmlns='urn:vim25'>
      <_this type='TaskHistoryCollector'>${managedTaskCollector._value}</_this>
      <maxCount>${maxCount}</maxCount>
    </ReadNextTasks>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((ReadNextTasksResponse: any) => {
      const res = [];

      ReadNextTasksResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  ReadPreviousTasks(
    connectionData: ConnectionData,
    managedTaskCollector: ManagedObjectReference & { $type: 'TaskHistoryCollector' },
    maxCount: number
  ) {
    const xml = `<ReadPreviousTasks xmlns='urn:vim25'>
      <_this type='TaskHistoryCollector'>${managedTaskCollector._value}</_this>
      <maxCount>${maxCount}</maxCount>
    </ReadPreviousTasks>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((ReadPreviousTasksResponse: any) => {
      const res = [];

      ReadPreviousTasksResponse.data.returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }
}
