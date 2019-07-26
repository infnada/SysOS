import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareFailoverClusterManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  getClusterMode() {

  }

  GetVchaClusterHealth() {

  }

  initiateFailover_Task() {

  }

  setClusterMode_Task() {

  }
}
