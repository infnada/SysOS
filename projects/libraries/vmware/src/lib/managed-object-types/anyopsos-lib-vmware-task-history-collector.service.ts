import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareTaskHistoryCollectorService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      if (data.ReadNextTasksResponse[0].returnval) {
        data.ReadNextTasksResponse[0].returnval.forEach(value => {
          res.push(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(value));
        });

        return this.AnyOpsOSLibVmwareHelper.validResponse(res);
      }

      return this.AnyOpsOSLibVmwareHelper.validResponse(null);
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
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      if (data.ReadPreviousTasksResponse[0].returnval) {
        data.ReadPreviousTasksResponse[0].returnval.forEach(value => {
          res.push(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(value));
        });

        return this.AnyOpsOSLibVmwareHelper.validResponse(res);
      }

      return this.AnyOpsOSLibVmwareHelper.validResponse(null);
    })).toPromise();
  }
}
