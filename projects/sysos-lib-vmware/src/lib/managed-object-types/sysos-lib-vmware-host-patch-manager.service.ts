import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostPatchManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CheckHostPatch_Task() {

  }

  InstallHostPatch_Task() {

  }

  InstallHostPatchV2_Task() {

  }

  QueryHostPatch_Task() {

  }

  ScanHostPatch_Task() {

  }

  ScanHostPatchV2_Task() {

  }

  StageHostPatch_Task() {

  }

  UninstallHostPatch_Task() {

  }
}
