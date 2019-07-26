import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareIoFilterManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  InstallIoFilter_Task() {

  }

  QueryDisksUsingFilter() {

  }

  QueryIoFilterInfo() {

  }

  QueryIoFilterIssues() {

  }

  ResolveInstallationErrorsOnCluster_Task() {

  }

  ResolveInstallationErrorsOnHost_Task() {

  }

  UninstallIoFilter_Task() {

  }

  UpgradeIoFilter_Task() {

  }
}
