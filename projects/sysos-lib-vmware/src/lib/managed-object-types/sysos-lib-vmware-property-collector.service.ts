import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {WaitOptions} from '../types/wait-options';
import {PropertyFilterSpec} from '../types/property-filter-spec';

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

  CreateFilter(
    connectionData: ConnectionData,
    spec: PropertyFilterSpec,
    partialUpdates: boolean
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <CreateFilter xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
      <partialUpdates>${partialUpdates}</partialUpdates>
    </CreateFilter>
  </soap:Body>
</soap:Envelope>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.CreateFilterResponse[0]);
    })).toPromise();
  }

  CreatePropertyCollector() {

  }

  DestroyPropertyCollector() {

  }

  RetrieveProperties(
    connectionData: ConnectionData,
    specSet: PropertyFilterSpec[],
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <RetrieveProperties xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
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
    connectionData: ConnectionData,
    options?: WaitOptions,
    version?: string
  ) {
    const xml = `<?xml version='1.0' encoding='utf-8'?>
<soap:Envelope xmlns:soap='http://schemas.xmlsoap.org/soap/envelope/'>
  <soap:Body>
    <WaitForUpdatesEx xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
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
