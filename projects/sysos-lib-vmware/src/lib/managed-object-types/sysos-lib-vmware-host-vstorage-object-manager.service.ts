import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostVstorageObjectManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  HostClearVStorageObjectControlFlags() {

  }

  HostCloneVStorageObject_Task() {

  }

  HostCreateDisk_Task() {

  }

  HostDeleteVStorageObject_Task() {

  }

  HostExtendDisk_Task() {

  }

  HostInflateDisk_Task() {

  }

  HostListVStorageObject() {

  }

  HostReconcileDatastoreInventory_Task() {

  }

  HostRegisterDisk() {

  }

  HostRelocateVStorageObject_Task() {

  }

  HostRenameVStorageObject() {

  }

  HostRetrieveVStorageInfrastructureObjectPolicy() {

  }

  HostRetrieveVStorageObject() {

  }

  HostRetrieveVStorageObjectState() {

  }

  HostScheduleReconcileDatastoreInventory() {

  }

  HostSetVStorageObjectControlFlags() {

  }

  HostVStorageObjectCreateDiskFromSnapshot_Task() {

  }

  HostVStorageObjectCreateSnapshot_Task() {

  }

  HostVStorageObjectDeleteSnapshot_Task() {

  }

  HostVStorageObjectRetrieveSnapshotInfo() {

  }

  HostVStorageObjectRevert_Task() {

  }
}