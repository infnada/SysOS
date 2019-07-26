import {Injectable} from '@angular/core';
import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";
import {map} from "rxjs/operators";
import {EventFilterSpec} from "../types/event-filter-spec";

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
    connectionData: connectionData,
    filter: EventFilterSpec
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <QueryEvents xmlns="urn:vim25">
      <_this type="EventManager">EventManager</_this>
      <filter>${this.SysosLibVmwareHelper.setDynamicProperties(filter)}</filter>
    </QueryEvents>
  </soap:Body>
</soap:Envelope>`;
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
