import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareIpPoolManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
