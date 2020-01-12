import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareDatacenterService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  PowerOnMultiVM_Task() {

  }

  QueryConnectionInfo() {

  }

  QueryConnectionInfoViaSpec() {

  }

  queryDatacenterConfigOptionDescriptor() {

  }

  ReconfigureDatacenter_Task() {

  }
}
