import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {ManagedObjectReference} from '../types/managed-object-reference';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareSearchIndexService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
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
    managedDatacenter?: ManagedObjectReference & { type: 'Datacenter' }
  ) {
    if (vmSearch === true && !instanceUuid) instanceUuid = false;

    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <FindByUuid xmlns='urn:vim25'>
      <_this type='SearchIndex'>SearchIndex</_this>
      ${(managedDatacenter ? `<datacenter type='Datacenter'>${managedDatacenter.value}</datacenter>` : '')}
      <uuid>${uuid}</uuid>
      <vmSearch>${vmSearch}</vmSearch>
      ${(instanceUuid && vmSearch === true ? `<instanceUuid>${instanceUuid}</instanceUuid>` : '')}
    </FindByUuid>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      const res = [];

      data.FindByUuidResponse[0].returnval.forEach(value => {
        res.push(this.SysosLibVmwareHelper.parseVMwareObject(value));
      });

      return this.SysosLibVmwareHelper.validResponse(res);
    })).toPromise();
  }

  FindChild() {

  }
}
