import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareGuestProcessManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  ListProcessesInGuest() {

  }

  ReadEnvironmentVariableInGuest() {

  }

  StartProgramInGuest() {

  }

  TerminateProcessInGuest() {

  }
}
