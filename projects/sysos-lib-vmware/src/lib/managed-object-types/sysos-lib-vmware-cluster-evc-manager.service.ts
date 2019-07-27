import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareClusterEVCManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CheckAddHostEvc_Task() {

  }

  CheckConfigureEvcMode_Task() {

  }

  ConfigureEvcMode_Task() {

  }

  DisableEvcMode_Task() {

  }
}
