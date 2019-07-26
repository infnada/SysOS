import {Injectable} from '@angular/core';

import {map} from "rxjs/operators";

import {SysosLibVmwareHelperService} from "../sysos-lib-vmware-helper.service";

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareSessionManagerService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
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
