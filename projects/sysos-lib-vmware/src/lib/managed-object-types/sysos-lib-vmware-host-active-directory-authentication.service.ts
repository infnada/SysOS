import {Injectable} from '@angular/core';

import {map} from 'rxjs/operators';

import {SysosLibVmwareHelperService} from '../sysos-lib-vmware-helper.service';

@Injectable({
  providedIn: 'root'
})
export class SysosLibVmwareHostActiveDirectoryAuthenticationService {

  constructor(private SysosLibVmwareHelper: SysosLibVmwareHelperService) {
  }

  DisableSmartCardAuthentication() {

  }

  EnableSmartCardAuthentication() {

  }

  ImportCertificateForCAM_Task() {

  }

  InstallSmartCardTrustAnchor() {

  }

  JoinDomain_Task() {

  }

  JoinDomainWithCAM_Task() {

  }

  LeaveCurrentDomain_Task() {

  }

  ListSmartCardTrustAnchors() {

  }

  RemoveSmartCardTrustAnchor() {

  }

  RemoveSmartCardTrustAnchorByFingerprint() {

  }

  ReplaceSmartCardTrustAnchors() {

  }
}
