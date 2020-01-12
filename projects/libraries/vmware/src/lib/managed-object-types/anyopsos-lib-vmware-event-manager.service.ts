import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {EventFilterSpec} from '../types/event-filter-spec';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareEventManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
      <filter>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(filter)}</filter>
    </QueryEvents>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {

      const res = [];

      data.QueryEventsResponse[0].returnval.forEach(value => {
        res.push(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(value));
      });

      return this.AnyOpsOSLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  RetrieveArgumentDescription() {

  }
}
