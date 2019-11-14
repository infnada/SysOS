import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';
import {ConnectionData} from '../types/connection-data';
import {Extension} from '../types/extension';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareExtensionManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  FindExtension(
    connectionData: ConnectionData,
    extensionKey: string
  ) {
    const xml = `<FindExtension xmlns='urn:vim25'>
      <_this type='ExtensionManager'>ExtensionManager</_this>
      <extensionKey>${extensionKey}</extensionKey>
    </FindExtension>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.FindExtensionResponse[0]);
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
      <extension>${this.AnyOpsOSLibVmwareHelper.setDynamicProperties(extension)}</extension>
    </RegisterExtension>`;
    return this.AnyOpsOSLibVmwareHelper.doCallSoap(connectionData, xml).pipe(map((data: any) => {
      return this.AnyOpsOSLibVmwareHelper.validResponse(data.RetrievePropertiesResponse[0]);
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
