import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareHostServiceSystemService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  RefreshServices() {

  }

  RestartService() {

  }

  StartService() {

  }

  StopService() {

  }

  UninstallService() {

  }

  UpdateServicePolicy() {

  }
}
