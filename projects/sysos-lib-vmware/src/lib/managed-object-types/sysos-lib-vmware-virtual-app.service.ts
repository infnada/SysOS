import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualAppService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CloneVApp_Task() {

  }

  ExportVApp() {

  }

  PowerOffVApp_Task() {

  }

  PowerOnVApp_Task() {

  }

  SuspendVApp_Task() {

  }

  unregisterVApp_Task() {

  }

  UpdateLinkedChildren() {

  }

  UpdateVAppConfig() {

  }
}
