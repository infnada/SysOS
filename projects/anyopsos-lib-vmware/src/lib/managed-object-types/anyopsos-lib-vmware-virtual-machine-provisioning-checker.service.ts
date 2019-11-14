import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareVirtualMachineProvisioningCheckerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
