import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {WaitOptions} from '../types/wait-options';
import {PropertyFilterSpec} from '../types/property-filter-spec';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwarePropertyCollectorService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
      <spec>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(spec)}</spec>
      <partialUpdates>${partialUpdates}</partialUpdates>
    </CreateFilter>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.CreateFilterResponse[0]);
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
      ${specSet.map((spec: PropertyFilterSpec) => {
        return `<specSet>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(spec)}</specSet>`;
      }).join('')}
    </RetrieveProperties>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.RetrievePropertiesResponse[0]);
    })).toPromise();
  }

  RetrievePropertiesEx() {

  }

  WaitForUpdates() {

  }

  WaitForUpdatesEx(
    connectionData: ConnectionData,
    options?: WaitOptions,
    version?: number
  ) {
    const xml = `<WaitForUpdatesEx xmlns='urn:vim25'>
      <_this type='PropertyCollector'>propertyCollector</_this>
      ${version ? `<version>${version}</version>` : ''}
      ${options ? `<options>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(options)}</options>` : ''}
    </WaitForUpdatesEx>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(this.AnyOpsOSLibVmwareHelper.parseVMwareObject(data.WaitForUpdatesExResponse[0]));
    })).toPromise();
  }
}
