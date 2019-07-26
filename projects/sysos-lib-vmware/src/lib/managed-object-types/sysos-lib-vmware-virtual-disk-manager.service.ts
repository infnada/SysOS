import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareVirtualDiskManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  CopyVirtualDisk_Task() {

  }

  CreateVirtualDisk_Task() {

  }

  DefragmentVirtualDisk_Task() {

  }

  DeleteVirtualDisk_Task() {

  }

  EagerZeroVirtualDisk_Task() {

  }

  ExtendVirtualDisk_Task() {

  }

  ImportUnmanagedSnapshot() {

  }

  InflateVirtualDisk_Task() {

  }

  MoveVirtualDisk_Task() {

  }

  QueryVirtualDiskFragmentation() {

  }

  QueryVirtualDiskGeometry() {

  }

  QueryVirtualDiskUuid() {

  }

  ReleaseManagedSnapshot() {

  }

  SetVirtualDiskUuid() {

  }

  ShrinkVirtualDisk_Task() {

  }

  ZeroFillVirtualDisk_Task() {

  }
}
