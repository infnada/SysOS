import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareIoFilterManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
