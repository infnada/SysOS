import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualMachineCompatibilityCheckerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CheckCompatibility_Task() {

  }

  CheckPowerOn_Task() {

  }

  CheckVmConfig_Task() {

  }
}
