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
    const xml = `<CreateFilter xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      <spec>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</spec>
      <partialUpdates>${partialUpdates}</partialUpdates>
    </CreateFilter>`;
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
    const xml = `<RetrieveProperties xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      ${specSet.forEach((spec: PropertyFilterSpec) => {
        return `<specSet>${this.SysosLibVmwareHelper.setDynamicProperties(spec)}</specSet>`;
      })}
    </RetrieveProperties>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.RetrievePropertiesResponse[0]);
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
    const xml = `<WaitForUpdatesEx xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      ${version ? `<version>${version}</version>` : ''}
      ${options ? `<options>${this.SysosLibVmwareHelper.setDynamicProperties(options)}</options>` : ''}
    </WaitForUpdatesEx>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(this.SysosLibVmwareHelper.parseVMwareObject(data.WaitForUpdatesExResponse[0]));
    })).toPromise();
  }
}
