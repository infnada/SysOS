import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVsanUpgradeSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  PerformVsanUpgrade_Task() {

  }

  PerformVsanUpgradePreflightCheck() {

  }

  QueryVsanUpgradeStatus() {

  }
}
