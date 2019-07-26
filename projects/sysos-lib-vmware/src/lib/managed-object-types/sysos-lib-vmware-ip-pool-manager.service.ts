import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareIpPoolManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  AllocateIpv4Address() {

  }

  AllocateIpv6Address() {

  }

  CreateIpPool() {

  }

  DestroyIpPool() {

  }

  QueryIPAllocations() {

  }

  QueryIpPools() {

  }

  ReleaseIpAllocation() {

  }

  UpdateIpPool() {

  }
}
