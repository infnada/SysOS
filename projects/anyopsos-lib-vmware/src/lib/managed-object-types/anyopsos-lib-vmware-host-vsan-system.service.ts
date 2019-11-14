import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostVsanSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  AddDisks_Task() {

  }

  EvacuateVsanNode_Task() {

  }

  InitializeDisks_Task() {

  }

  QueryDisksForVsan() {

  }

  QueryHostStatus() {

  }

  RecommissionVsanNode_Task() {

  }

  RemoveDisk_Task() {

  }

  RemoveDiskMapping_Task() {

  }

  UnmountDiskMapping_Task() {

  }

  UpdateVsan_Task() {

  }
}
