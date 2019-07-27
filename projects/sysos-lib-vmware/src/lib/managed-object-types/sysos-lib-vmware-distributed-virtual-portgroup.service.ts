import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareDistributedVirtualPortgroupService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DVPortgroupRollback_Task() {

  }

  ReconfigureDVPortgroup_Task() {

  }
}
