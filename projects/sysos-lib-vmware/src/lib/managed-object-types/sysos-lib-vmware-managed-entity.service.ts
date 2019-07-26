import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {ManagedObjectReference} from "../types/managed-object-reference";


@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareManagedEntityService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  Destroy_Task() {

  }

  Reload(
    connectionData: connectionData,
    managedObject: ManagedObjectReference
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <Reload xmlns="urn:vim25">
      <_this type="${managedObject.type}">${managedObject.value}</_this>
    </Reload>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.ReloadResponse[0]);
    })).toPromise();
  }

  Rename_Task() {

  }
}
