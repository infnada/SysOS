import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualMachineProvisioningCheckerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CheckClone_Task() {

  }

  CheckInstantClone_Task() {

  }

  CheckMigrate_Task() {

  }

  CheckRelocate_Task() {

  }

  QueryVMotionCompatibilityEx_Task() {

  }
}
