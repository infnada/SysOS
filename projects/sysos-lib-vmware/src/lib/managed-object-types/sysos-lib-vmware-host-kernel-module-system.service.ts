import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostKernelModuleSystemService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  QueryConfiguredModuleOptionString() {

  }

  QueryModules() {

  }

  UpdateModuleOptionString() {

  }
}
