import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";
import {connectionData} from "../types/connection-data";
import {Extension} from "../types/extension";
import {WaitOptions} from "../types/wait-options";
import {PropertyFilterSpec} from "../types/property-filter-spec";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwarePropertyCollectorService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CancelRetrievePropertiesEx() {

  }

  CancelWaitForUpdates() {

  }

  CheckForUpdates() {

  }

  ContinueRetrievePropertiesEx() {

  }

  CreateFilter() {

  }

  CreatePropertyCollector() {

  }

  DestroyPropertyCollector() {

  }

  RetrieveProperties(
    connectionData: connectionData,
    specSet: PropertyFilterSpec[],
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <RetrieveProperties xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      ${specSet.forEach((spec: PropertyFilterSpec) => {
        return `<specSet>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</specSet>`;
      })}
    </RetrieveProperties>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.WaitForUpdatesExResponse[0]);
    })).toPromise();
  }

  RetrievePropertiesEx() {

  }

  WaitForUpdates() {

  }

  WaitForUpdatesEx(
    connectionData: connectionData,
    options?: WaitOptions,
    version?: string
  ) {
    const xml = `<?xml version="1.0" encoding="utf-8"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <WaitForUpdatesEx xmlns="urn:vim25">
      <_this type="PropertyCollector">propertyCollector</_this>
      ${version ? `<version>${version}</version>` : ''}
      ${options ? `<options>${this.SysosLibVmwareHelper.setDynamicProperties(options)}</options>` : ''}
    </WaitForUpdatesEx>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.WaitForUpdatesExResponse[0]);
    })).toPromise();
  }
}
