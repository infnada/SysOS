import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareDatastoreService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DatastoreEnterMaintenanceMode() {

  }

  DatastoreExitMaintenanceMode_Task() {

  }

  DestroyDatastore() {

  }

  RefreshDatastore() {

  }

  RefreshDatastoreStorageInfo() {

  }

  RenameDatastore() {

  }

  UpdateVirtualMachineFiles_Task() {

  }

  UpdateVVolVirtualMachineFiles_Task() {

  }
}
