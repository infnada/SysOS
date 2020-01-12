import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostAccessManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ChangeAccessMode() {

  }

  ChangeLockdownMode() {

  }

  QueryLockdownExceptions() {

  }

  QuerySystemUsers() {

  }

  RetrieveHostAccessControlEntries() {

  }

  UpdateLockdownExceptions() {

  }

  UpdateSystemUsers() {

  }
}
