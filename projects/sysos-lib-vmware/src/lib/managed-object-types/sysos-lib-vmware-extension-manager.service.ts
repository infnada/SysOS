import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {Extension} from '../types/extension';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareExtensionManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  FindExtension(
    connectionData: ConnectionData,
    extensionKey: string
  ) {
    const xml = `<FindExtension xmlns='urn:vim25'>
      <_this type='ExtensionManager'>ExtensionManager</_this>
      <extensionKey>${extensionKey}</extensionKey>
    </FindExtension>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.FindExtensionResponse[0]);
    })).toPromise();
  }

  GetPublicKey() {

  }

  QueryExtensionIpAllocationUsage() {

  }

  QueryManagedBy() {

  }

  RegisterExtension(
    connectionData: ConnectionData,
    extension: Extension
  ) {
    const xml = `<RegisterExtension xmlns='urn:vim25'>
      <_this type='ExtensionManager'>ExtensionManager</_this>
      <extension>${this.SysosLibVmwareHelper.setDynamicProperties(extension)}</extension>
    </RegisterExtension>`;
    return this.SysosLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.SysosLibVmwareHelper.validResponse(data.RetrievePropertiesResponse[0]);
    })).toPromise();
  }

  SetExtensionCertificate() {

  }

  SetPublicKey() {

  }

  UnregisterExtension() {

  }

  UpdateExtension() {

  }
}
