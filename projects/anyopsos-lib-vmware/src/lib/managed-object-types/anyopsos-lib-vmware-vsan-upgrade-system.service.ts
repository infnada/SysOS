import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareVsanUpgradeSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  PerformVsanUpgrade_Task() {

  }

  PerformVsanUpgradePreflightCheck() {

  }

  QueryVsanUpgradeStatus() {

  }
}
