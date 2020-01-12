import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';


@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareManagedEntityService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  Destroy_Task() {

  }

  Reload(
    connectionData: ConnectionData,
    managedObject: ManagedObjectReference
  ) {
    const xml = `<Reload xmlns='urn:vim25'>
      <_this type='${managedObject.$type}'>${managedObject._value}</_this>
    </Reload>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.ReloadResponse[0]);
    })).toPromise();
  }

  Rename_Task() {

  }
}
