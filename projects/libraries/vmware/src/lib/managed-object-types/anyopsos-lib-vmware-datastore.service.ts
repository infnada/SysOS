import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareDatastoreService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
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
