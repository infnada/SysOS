import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareGuestWindowsRegistryManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  CreateRegistryKeyInGuest() {

  }

  DeleteRegistryKeyInGuest() {

  }

  DeleteRegistryValueInGuest() {

  }

  ListRegistryKeysInGuest() {

  }

  ListRegistryValuesInGuest() {

  }

  SetRegistryValueInGuest() {

  }
}
