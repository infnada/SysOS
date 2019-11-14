import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareClusterEVCManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
