import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostHealthStatusSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ClearSystemEventLog() {

  }

  FetchSystemEventLog() {

  }

  RefreshHealthStatusSystem() {

  }

  ResetSystemHealthInfo() {

  }
}
