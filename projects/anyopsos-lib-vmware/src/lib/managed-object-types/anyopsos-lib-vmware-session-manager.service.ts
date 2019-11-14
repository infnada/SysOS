import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {AnyOpsOSLibVmwareHelperService} from '../anyopsos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class AnyOpsOSLibVmwareSessionManagerService {

  constructor(private AnyOpsOSLibVmwareHelper: AnyOpsOSLibVmwareHelperService) {
  }

  AcquireCloneTicket() {

  }

  AcquireGenericServiceTicket() {

  }

  AcquireLocalTicket() {

  }

  CloneSession() {

  }

  ImpersonateUser() {

  }

  Login() {

  }

  LoginBySSPI() {

  }

  LoginByToken() {

  }

  LoginExtensionByCertificate() {

  }

  LoginExtensionBySubjectName() {

  }

  Logout() {

  }

  SessionIsActive() {

  }

  SetLocale() {

  }

  TerminateSession() {

  }

  UpdateServiceMessage() {

  }
}
