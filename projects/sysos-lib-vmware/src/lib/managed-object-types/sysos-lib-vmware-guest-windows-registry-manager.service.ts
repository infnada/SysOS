import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareGuestWindowsRegistryManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
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