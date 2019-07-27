import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {EventFilterSpec} from '../types/event-filter-spec';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareEventManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CreateCollectorForEvents() {

  }

  LogUserEvent() {

  }

  PostEvent() {

  }

  QueryEvents(
    connectionData: ConnectionData,
    filter: EventFilterSpec
  ) {
    const xml = `<QueryEvents xmlns='urn:vim25'>
      <_this type='EventManager'>EventManager</_this>
      <filter>${this.SysosLibVmwareHelper.setDynamicProperties(filter)}</filter>
    </QueryEvents>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      const res = [];

      data.QueryEventsResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  RetrieveArgumentDescription() {

  }
}
