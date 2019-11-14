import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareSearchIndexService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  FindAllByDnsName() {

  }

  FindAllByIp() {

  }

  FindAllByUuid() {

  }

  FindByDatastorePath() {

  }

  FindByDnsName() {

  }

  FindByInventoryPath() {

  }

  FindByIp() {

  }

  FindByUuid(
    connectionData: ConnectionData,
    uuid: string,
    vmSearch: boolean,
    instanceUuid?: boolean,
    managedDatacenter?: ManagedObjectReference & { $type: 'Datacenter' }
  ) {
    if (vmSearch === true && !instanceUuid) instanceUuid = false;

    const xml = `<FindByUuid xmlns='urn:vim25'>
      <_this type='SearchIndex'>SearchIndex</_this>
      ${(managedDatacenter ? `<datacenter type='Datacenter'>${managedDatacenter._value}</datacenter>` : '')}
      <uuid>${uuid}</uuid>
      <vmSearch>${vmSearch}</vmSearch>
      ${(instanceUuid && vmSearch === true ? `<instanceUuid>${instanceUuid}</instanceUuid>` : '')}
    </FindByUuid>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.FindByUuidResponse[0].returnval.forEach(value => {
        res.push(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(value));
      });

      return this.AnyOpsOSLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  FindChild() {

  }
}
